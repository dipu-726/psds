
/*
	[10, 5, 2, 7, 1, 9]
	 ^
	        ^

	  0     2

*/



// brute force
// we do iterations
const solutionBruteForce = (arr, k) => {
	let maxLenth = 0;

	for (let i = 0 ; i < arr.length; i++) {
		let sum = 0;

		for (let j = i ; j < arr.length; j++) {
			sum = sum + arr[j];
			if (sum === k) {
				maxLenth = Math.max(maxLenth, j-i+1)
				break;
			}
		}
	}

	return maxLenth;
}

console.log(solutionBruteForce([10, 5, 2, 7, 1, 9], 15)); // 4
console.log(solutionBruteForce([-3, 2, 1], 6)) // 0

