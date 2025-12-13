/*
		[1,1,1,0,0,1,1,1,1]


		max = 3
		temp = 0
*/

const solution = (arr) => {
	let max = 0;
	let tempCount = 0;

	for(let i = 0; i<arr.length; i++) {
		if (arr[i] == 1) {
			tempCount++;
		}
		else if (arr[i] !==1) {
			max = Math.max(max, tempCount);
			tempCount = 0;
		}
	}

	return Math.max(max, tempCount);
};

console.log(solution([1,1,1,0,0,1,1,1,1]))