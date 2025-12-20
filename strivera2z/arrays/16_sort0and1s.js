/*	

	o(2n)

	[0, 1, 1, 1, 2]
	          l
	             r

	
	if (arr[r] == 0) {
		swap(arr,l,r);
		l++;	
	}
	r++;
	

	r = l
	if(arr[r] == 1) {
		swap(arr,l,r);
		l++;
	}
	r++;


     

     


    [2, 1, 0, 2, 1, 0]

*/


const solution = (arr) => {

}


console.log(solution([1, 0, 2, 1, 0]))
console.log(solution([[0, 0, 1, 1, 1]]))