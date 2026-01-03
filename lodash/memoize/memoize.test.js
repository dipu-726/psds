import test from 'node:test';
import assert from 'node:assert/strict';
import memoize from './memoize.js';

test('memoize', async (t) => {

  await t.test('caches result for same key', () => {
    let calls = 0;

    const fn = (x) => {
      calls++;
      return x * 2;
    };

    const m = memoize(fn);

    assert.equal(m(2), 4);
    assert.equal(m(2), 4);
    assert.equal(calls, 1);
  });

  await t.test('preserves this context', () => {
    const obj = {
      factor: 3,
      fn(x) {
        return x * this.factor;
      }
    };

    obj.memoized = memoize(obj.fn);

    assert.equal(obj.memoized.call(obj, 2), 6);
  });

  await t.test('expires cache entry after TTL', async () => {
    let calls = 0;

    const fn = () => {
      calls++;
      return calls;
    };

    const m = memoize(fn, { ttl: 50 });

    assert.equal(m(), 1);

    await new Promise(r => setTimeout(r, 60));

    assert.equal(m(), 2);
  });

  await t.test('evicts oldest entry when maxSize exceeded', () => {
    const fn = (x) => x;

    const m = memoize(fn, { maxSize: 2 });

    m(1);
    m(2);
    m(3); // evicts 1

    assert.equal(m(2), 2);
    assert.equal(m(1), 1); // recomputed
  });

  await t.test('does not cache errors', () => {
    let calls = 0;

    const fn = () => {
      calls++;
      throw new Error('boom');
    };

    const m = memoize(fn);

    assert.throws(() => m(), /boom/);
    assert.throws(() => m(), /boom/);
    assert.equal(calls, 2);
  });

  await t.test('caches separately for different keys', () => {
    let calls = 0;

    const fn = (x) => {
      calls++;
      return x;
    };

    const m = memoize(fn);

    m(1);
    m(2);
    m(1);

    assert.equal(calls, 2);
  });

});
