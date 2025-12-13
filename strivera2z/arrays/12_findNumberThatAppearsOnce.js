/*
	
	
	[1,2,2]

	{4,1,2,1,2}
	 ^
	         ^


*/


const solution = (arr) => {
	let xor = 0;
	for(let i =0; i < arr.length; i++) {
		xor = xor^arr[i];
	}
	return xor;
}

console.log(solution([1,2,2]));
console.log(solution([4,1,2,1,2]));