/*	


	[0, 0 , 2 , 1, 1]
	        l 
	            nr

    [2, 1, 0, 2, 1, 0]

*/


/*
	Brute force
	 - sort the array using sorting method
	 - sort the array using inplace sorting method
	 - Sort in 2 phases
	 		- sort the 0 first
	 		- sort the 1st later
		
*/

// sort in 2 phases
const solution = (arr) => {

	const swap = (arr, l , r) => {
		let temp = arr[l];
		arr[l] = arr[r];
		arr[r] = temp;
	}

	let l = 0;
	let r = 0;

	// sort for 0s
	while(r < arr.length) {
		if (arr[r] == 0) {
			if (r - l >= 1) swap(arr, l, r);
			l++;
		}
		r++;
	}

	let nRight = l;
	// sort for 1s
	while(nRight < arr.length) {
		if (arr[nRight] == 1) {
			if (nRight - l >= 1) swap(arr, l, nRight);
			l++;
		}
		nRight++;
	}

	return arr;
}

console.log(solution([1, 0, 2, 1, 0]))
console.log(solution([[0, 0, 1, 1, 1]]))