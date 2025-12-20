const solutionBurteForce = (arr, target) => {
	const len = arr.length;
	const pairs = [];
	for ( let i = 0 ; i < len; i++) {
		for (let j = i+1; j < len; j++) {
			if (arr[i] + arr[j] === target) {
				pairs.push([ arr[i], arr[j] ]);
			}
		}
	}

	return pairs;
}

const solution = (arr, target) => {
	const map = {};
	const pairs = [];

	arr.forEach((ele) => {
		if (map[ele]) {
			map[ele] = map[ele] + 1;
		}
		else {
			map[ele] = 1;
		}
	});


	arr.forEach(ele => {
		const remain = target - ele;
		if(map[remain] > 0) {
			pairs.push([ele, remain])
			map[remain] = map[remain] - 1;
			map[ele] = map[ele] -1;
		}
	})

	return pairs;
}

console.log(solution([2,6,5,8,6,8,11], 14));
console.log(solution([2,6,5,8,11], 15))