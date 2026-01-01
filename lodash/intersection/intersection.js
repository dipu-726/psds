// ----------------------------------
// Intersection : Expectation
// ----------------------------------
// Creates an array of unique values that are included in all given arrays 
// using SameValueZero for equality comparisons. 
// The order and references of result values are determined by the first array.

const intersection = (arr1, arr2) => {
	if(!Array.isArray(arr1)) {
		throw new TypeError("Expected array but recieved ", arr1, " as ",typeof arr1);
	}
	
	if(!Array.isArray(arr2)) {
		throw new TypeError("Expected array but recieved ", arr2, " as ",typeof arr2);
	}

	const arrSet = new Set(arr2);
	const seen = new Set();
1
	const result = [];

	arr1.forEach(item => {
		if(arrSet.has(item) && !seen.has(item)) {
			result.push(item);
			seen.add(item);
		}
	})

	return result;
}

export default intersection;