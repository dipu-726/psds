/*

Input
-----
5

Output
-------
*****
*****
*****
*****
*****

Time Complexitiy
----------------
O(N2)

Space Complexity
----------------
O(1)

*/

const print = (n = 5) => {
	for(let i =0; i<n; i++) {
		let str = '';
		for(let j=0; j<n; j++) {
			str = str + "*"
		}
		console.log(str);
	}
}

print();