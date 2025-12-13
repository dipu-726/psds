/*
	Input:
		n = 5,
		m = 5 
		arr1[] = {1,2,3,4,5}
		arr2[] = {2,3,4,4,5}

		[1,2,3,4,5]
		         l
		[2,3,4,4,5]

		============================

		[1,1,1,1,1]
		   l

		[2,1,1,1,1]
		 r
		 
	
		
		[1]


		const validateAndPush = (ele, idx) => {
			if(idx == 0) {
				arr.push(ele);
				return false;
			}

			if(arr[idx] == arr[idx-1]) return false;
			return res.push(ele);
		}

		while(l<arr1.length || r < arr2.length){
			if (arr[l] < arr[r]) {
				validateAndPush(arr[l], l);
		 		l++;
			}
			else if (arr[l] === arr[r]) {
				validateAndPush(arr[l], l);
				l++;
				r++;
			}
			else {
				r++
			}
		}

*/


const solution = (arr, arr2) => {
	const res = [];

	let r = 0;
	let l = 0;

	const validateAndPush = (ele) => {
		if(res.length == 0) {
			res.push(ele);
			return;
		}

		const length = res.length;
		if (res[length-1] === ele) return;
		res.push(ele);
	}

		while(l<arr.length && r < arr2.length){
			if(arr[l] < arr2[r]) {
				validateAndPush(arr[l]);
				l++;
			}
			else if (arr2[r] < arr[l]){
				validateAndPush(arr2[r]);
				r++;
			}
			else {
				validateAndPush(arr[l]);
				r++;
				l++;
			}
		}

		while (l < arr.length) validateAndPush(arr[l++]);
    	while (r < arr2.length) validateAndPush(arr2[r++]);

		return res;
}

console.log(solution([1,1,1,1],[2,2,2]));
console.log(solution([1,2,3,4,5],[2,3,4,5]));
console.log(solution([2,3,4,5], [1,2,3,4,5]));