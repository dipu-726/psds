/*

Output
------
1
12
123
1234
12345

*/

const print = (n =5) => {
	for (let i =1; i<n+1; i++) {
		let str = "";
		for (let j=1; j<=i; j++) {
			str+=j;
		}
		console.log(str);
	}
}

print(5);
