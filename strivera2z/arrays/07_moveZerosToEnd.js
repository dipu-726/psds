// [1 ,0 ,2 ,3 ,0 ,4 ,0 ,1]
// [1 ,2 ,3 ,4 ,1 ,0 ,0 ,0]

/*

	[1 ,0 ,2 ,3 ,0 ,4 ,0 ,1]
		
	[1 ,2 ,3 ,4 ,1 ,4 ,0 ,0]
	             l
	                      r

	 initial
	 	l = 0;
	 	r = 0;


	 1st iterate
	 	if arr[l] != 0
	 		l++;
	 	else if (arr[r] !== 0)
	 		swap(arr, l,r)
	 		l++;

	 	r++;
	 		


	[0 ,0 ,2 ,3 ,0 ,4 ,0 ,1]


	[1 ,2 ,3 ,4 ,1 ,0 ,0 ,0]


*/

// [1,2,0,1,0,4,0]
// [1,2,1,4,0,0,0]

// burte force
	// count the unique non-zeros
	// then fill them into a new arr
	// fill the remaining slots with 0s

const solutionBruteForce = (arr) => {
	const tempArr = new Array(arr.length).fill(undefined);

	let tempArrIdx = 0;

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] !== 0) {
			tempArr[tempArrIdx] = arr[i];
			tempArrIdx++;
		}
	}

	while(tempArrIdx < tempArr.length) {
		tempArr[tempArrIdx] = 0;
		tempArrIdx++;	
	}

	return tempArr;
}

const swap = (arr, l, r) =>  {
	const temp = arr[l];
	arr[l] = arr[r]
	arr[r] = temp;
}

const solution = (arr) => {
	let leftIdx = 0;
	let rightIdx = 0;

	while(rightIdx < arr.length) {
		if (arr[leftIdx] !== 0) {
			leftIdx++;
		}
		else if (arr[rightIdx] !==0) {
			swap(arr, leftIdx, rightIdx);
			leftIdx++
		}

		rightIdx++
	}

	return arr;
}


console.log(solution([1 ,0 ,2 ,3 ,0 ,4 ,0 ,1]));
console.log(solution([1,2,0,1,0,4,0]));
console.log(solution([0, 1, 0, 3, 12]))