// ----------------------------------
// Intersection : Expectation
// ----------------------------------
// Creates an array of unique values that are included in all given arrays 
// using SameValueZero for equality comparisons. 
// The order and references of result values are determined by the first array.

// const intersectionForTwoArrays = (arr1, arr2) => {
// 	if(!Array.isArray(arr1)) {
// 		throw new TypeError("Expected array but recieved ", arr1, " as ",typeof arr1);
// 	}
	
// 	if(!Array.isArray(arr2)) {
// 		throw new TypeError("Expected array but recieved ", arr2, " as ",typeof arr2);
// 	}

// 	const arrSet = new Set(arr2);
// 	const seen = new Set();
// 1
// 	const result = [];

// 	arr1.forEach(item => {
// 		if(arrSet.has(item) && !seen.has(item)) {
// 			result.push(item);
// 			seen.add(item);
// 		}
// 	})

// 	return result;
// }


// brute force
// const intersection = (...arrays) => {
// 	if (arrays.length === 0) return [];

// 	let intersectionSet = new Set(arrays[0]);

// 	for (let i = 1; i < arrays.length; i++) {
// 		// if arr[i] contains how many common elements with intersection set
// 		const commonItems = arrays[i].filter(item => intersectionSet.has(item));
// 		intersectionSet = new Set(commonItems);

// 		// early exit
// 		if (intersectionSet.size === 0) return [];
// 	}

// 	return Array.from(intersectionSet);
// }


/*
	Concerns with above problem 

1. for new Set(arrays[0])
	
	Creating the set for always 0th element, i.e arrays[0], is not correct

	Scenario
	----------
	 - huge_array
	 - small_array
	 - mid_size_array

	Problem 
	 	 - Since we are talking about interection, 
	 	 	- max size of the resultant could be all elements present in smallest array
	 	 - we will end up taking space
	
	Expectation
		- We can create the Set for the starting element
	
*/


const intersection = (...arrays) => {
	if (arrays.length === 0) return [];

	arrays.sort((a , b) => a.length - b.length);

	let intersectionSet = new Set(arrays[0]);

	for (let i = 1; i < arrays.length; i++) {
		const currentSet = new Set(arrays[i]);
		for (const val of intersectionSet) {
			if (!currentSet.has(val)) {
				intersectionSet.delete(val);
			}
		}
	}

	return Array.from(intersectionSet);
}

export default intersection;
