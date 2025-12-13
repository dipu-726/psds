/*

Input
------
5

Output
------
*
**
***
****
*****

Time Complexity
----------------


Space Complexity
----------------
O(1)

*/

const print = (n=5) => {
	for(let i = 0; i<n; i++) {
		let str = "";
		for (let j=0; j<=i; j++) {
			str+= "*";
		}
		console.log(str);
	}
};

print(5);