import test from 'node:test';
import assert from 'node:assert';
import memoize from './memoize.js'; // adjust path

test('memoize - primitive arguments', async (t) => {
  await t.test('numbers', () => {
    const fn = (x, y) => x + y;
    const memo = memoize(fn);

    assert.equal(memo(1, 2), 3);        // computed
    assert.equal(memo(1, 1), 2);        // cached
    assert.notEqual(memo(2, 2), 3);     // new input
  });

  await t.test('strings', () => {
    const fn = (s1, s2) => s1 + s2;
    const memo = memoize(fn);

    assert.equal(memo('a', 'b'), 'ab');
    assert.equal(memo('a', 'b'), 'ab'); // cached
  });

  await t.test('booleans', () => {
    const fn = (b) => !b;
    const memo = memoize(fn);

    assert.equal(memo(true), false);
    assert.equal(memo(true), false); // cached
  });
});

test('memoize - object and array arguments', async (t) => {
  await t.test('object identity', () => {
    const fn = (obj) => obj.value * 2;
    const memo = memoize(fn, {
      keyResolver: args => args[0] // default uses object identity
    });

    const obj1 = { value: 3 };
    const obj2 = { value: 3 };

    assert.equal(memo(obj1), 6);      // computed
    assert.equal(memo(obj1), 6);      // cached
    assert.equal(memo(obj2), 6);      // different reference → recomputed
  });

  await t.test('array arguments', () => {
    const fn = (arr) => arr.reduce((a, b) => a + b, 0);
    const memo = memoize(fn, {
      keyResolver: args => JSON.stringify(args[0])
    });

    const a = [1,2,3];
    const b = [1,2,3];

    assert.equal(memo(a), 6);         // computed
    assert.equal(memo(a), 6);         // cached
    assert.equal(memo(b), 6);         // JSON key matches → cached
  });
});

test('memoize - date arguments', async (t) => {
  await t.test('dates', () => {
    const fn = (date) => date.getTime();
    const memo = memoize(fn, {
      keyResolver: args => args[0].toISOString()
    });

    const d1 = new Date('2026-01-03T00:00:00Z');
    const d2 = new Date('2026-01-03T00:00:00Z');

    assert.equal(memo(d1), d1.getTime());
    assert.equal(memo(d2), d1.getTime()); // cached via string key
  });
});

test('memoize - function arguments', async (t) => {
  await t.test('functions as arguments', () => {
    const fn = (f) => f(2);
    const memo = memoize(fn, {
      keyResolver: args => args[0] // use reference
    });

    const f1 = x => x*2;
    const f2 = x => x*2;

    assert.equal(memo(f1), 4);
    assert.equal(memo(f1), 4);  // cached
    assert.equal(memo(f2), 4);  // different reference → recomputed
  });
});

test('memoize - instance / this context', async (t) => {
  await t.test('preserve this', () => {
    const obj = {
      factor: 5,
      multiply(x) {
        return x * this.factor;
      }
    };

    obj.memoMultiply = memoize(obj.multiply);

    assert.equal(obj.memoMultiply.call(obj, 2), 10); // call-site this
    assert.equal(obj.memoMultiply.call(obj, 2), 10); // cached
  });
});

test('memoize - TTL expiration', async (t) => {
  await t.test('expires after ttl', async () => {
    const fn = x => x * 2;
    const memo = memoize(fn, { ttl: 50 }); // 50 ms

    assert.equal(memo(3), 6);    // cached
    await new Promise(r => setTimeout(r, 60));
    assert.equal(memo(3), 6);    // recomputed after TTL
  });
});

test('memoize - eviction / maxSize', async (t) => {
  await t.test('eviction works', () => {
    const fn = x => x;
    const memo = memoize(fn, { maxSize: 2 });

    memo(1); // cache 1
    memo(2); // cache 2
    memo(3); // cache 3 → should evict oldest (1)

    assert(!memo.cache?.has(1)); // oldest evicted
  });
});

test('memoize - error handling', async (t) => {
  await t.test('does not cache errors', () => {
    let callCount = 0;
    const fn = (x) => {
      callCount++;
      if(x < 0) throw new Error('neg');
      return x;
    };
    const memo = memoize(fn);

    assert.throws(() => memo(-1), /neg/);
    assert.equal(callCount, 1);
    assert.throws(() => memo(-1), /neg/); // recomputed
    assert.equal(callCount, 2);
  });
});
