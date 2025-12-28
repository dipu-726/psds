import test from 'node:test';
import assert from 'node:assert';

import groupBy from './groupBy.js';

test("groupBy: groups number by even/odd", () => {

	const evaluateType = (n) => n % 2 === 0 ? "even" : "odd";
	const result = groupBy([1,2,3,4,5,6,7], evaluateType);

	assert.deepStrictEqual(result, {
		"odd": [1,3,5,7],
		"even": [2,4,6]
	});
})