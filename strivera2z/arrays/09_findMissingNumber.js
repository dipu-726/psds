const solution = (arr) => {
	const n = arr.length + 1;
	const sum = (n*(n+1))/2
	const arrSum = arr.reduce((res, ele) => res + ele, 0);
	return sum - arrSum;
}

console.log(solution([1,2,3,5]))
console.log(solution([1,2,3,4,5]))