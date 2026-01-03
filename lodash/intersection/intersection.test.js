import test from 'node:test';
import assert from 'node:assert';
import intersection from './intersection.js'; // Your 2-array intersection implementation

test('intersection', async (t) => {
  // Basic common elements test
  await t.test('Basic common elements', () => {
    const result = intersection([1, 2, 3], [2, 3, 4]);
    assert.deepStrictEqual(result, [2, 3]);
  });

  // No common elements
  await t.test('No common elements', () => {
    const result = intersection([5, 6], [7, 8]);
    assert.deepStrictEqual(result, []);
  });

  // Arrays with duplicates
  await t.test('Arrays with duplicates', () => {
    const result = intersection([1, 2, 2, 3], [2, 2, 4]);
    assert.deepStrictEqual(result, [2]);
  });

  // Arrays with different types
  await t.test('Arrays with mixed types', () => {
    const result = intersection([1, '2', 3], [1, 2, '2']);
    assert.deepStrictEqual(result, [1, '2']);
  });

  // Edge cases: empty arrays
  await t.test('Empty arrays', () => {
    assert.deepStrictEqual(intersection([], [1, 2]), []);
    assert.deepStrictEqual(intersection([1, 2], []), []);
    assert.deepStrictEqual(intersection([], []), []);
  });

  // Large arrays performance check
  await t.test('Large arrays', () => {
    const arr1 = Array.from({ length: 1000 }, (_, i) => i);
    const arr2 = Array.from({ length: 1000 }, (_, i) => i + 500);
    const expected = Array.from({ length: 500 }, (_, i) => i + 500);
    assert.deepStrictEqual(intersection(arr1, arr2), expected);
  });

  // Duplicate elements in first array only
  await t.test('Duplicates only in first array', () => {
    const result = intersection([1, 1, 2, 3], [1, 2, 4]);
    assert.deepStrictEqual(result, [1, 2]);
  });

  // Special values: null, undefined, NaN
  await t.test('Arrays with null, undefined, NaN', () => {
    const result = intersection([null, undefined, NaN], [undefined, NaN]);
    assert.deepStrictEqual(result, [undefined, NaN]); // lodash does not match NaN by default
  });

  // Error handling: more than 2 arrays
  await t.test('More than two arrays (optional behavior)', () => {
    try {
      intersection([1, 2], [2, 3], [3, 4]);
      assert.ok(true, 'Handled third array gracefully');
    } catch (err) {
      assert.ok(err instanceof Error, 'Throws an error when more than 2 arrays are passed');
    }
  });
});