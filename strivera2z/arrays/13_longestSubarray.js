
/*
	[10, 5, 2, 7, 1, 9]
	 ^
	        ^

	  0     2

		
		1

	  [10, 5, 2, 7, 1, 9], 			15
	       l
	          r
		
		========
		maxLen = 0;
		sum = 0;
		
		[30,3,1,1,1]
		    l
		    r

		========

		[1, -1, 5, -2, 3], 3
		        l
     	        r

		1
		0 
		5
		4

	
		let maxLen = 0;
		let sum = 0;


		while( l <= r) {
			sum = sum + arr[r];
			if (sum == k) {
				maxLen = Math.max(maxLen, r - l + 1);
				sum = sum - arr[l];
				l++;
			}
			else if (sum > k) {
				sum = sum - arr[l];
				l++;
			}
			r++;
		}

		while(l < r) {
			if (l == r) {
				sum = sum + arr[l];
				if (sum == k) {
					maxLen = Math.max(maxLen, r - l + 1);
					l++;
				}
				r++;
				continue;
			}

			sum = sum + arr[r];
			if (sum === k) {
				maxLen = Math.max(maxLen, r - l + 1);
				l++;
			}
			r++;
		}

		return maxLen;


		with for loop

*/


/*	
	15

	[10, 5, 2, 7, 1, 9]
	 l 
	 r

	
	let l = 0;
	let r = 0;
	let sum = 0;
	 while(r < arr.length) {
		if (sum > k) {
			while(l < r) {
				l 
			}
		}
	 }




const sol = (arr, k) => {
	let l = 0;
	let r = 0;
	let maxLen = 0;
	let sum = 0;

	while(r < arr.length) {
			
		sum = sum + arr[r];

		

		if (sum == k) {
			maxLen = Math.max(maxLen, r - l + 1);
			sum = sum - arr[l];
			l++;
		}
		r++;
	}


	k = 12
	arr = [1, 2, 3, 7, 5]
		   l
		   r
	
	sum = 0
	sum = 1
	sum = 3
	sum = 6 
	sum = 13
	sum = 12

	max = 3








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

const solutionIncorrect = (arr, k) => {
	let l = 0;
	let r = 0;
	let maxLen = 0;
	let sum = 0;

	while(r < arr.length) {
			sum = sum + arr[r];
			if (sum == k) {
				maxLen = Math.max(maxLen, r - l + 1);
				sum = sum - arr[l];
				l++;
			}
			else if (sum > k) {
				sum = sum - arr[l];
				l++;
			}
			r++;
		}

	return maxLen;
}


const solution = (arr, k) => {
	let l = 0;
	let r = 0;
	let sum = 0;

	while(r < arr.length) {
		// sum is larger than k keep shrinking the window size

		// if sum == k, then update the maxLen
		r++;
	}
}

// console.log(solutionBruteForce([10, 5, 2, 7, 1, 9], 15)); // 4
// console.log(solutionBruteForce([-3, 2, 1], 6)) // 0

console.log(solution([10, 5, 2, 7, 1, 9], 15)); // 4
console.log(solution([-3, 2, 1], 6)) // 0
console.log(solution([30, 100, 200, 3, 1,3,1,1,1,-2,1,1,1,1], 5)) // 0
console.log(solution([1, -1, 5, -2, 3], 3))
