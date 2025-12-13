/*

Output
-------
1
22
333
4444
55555

*/

const print = (n = 5) => {
	for (let i = 1; i < n+1; i++) {
		let str = '';
		for (let j = 1; j <= i; j++) {
			str+=i;
		}
		console.log(str);
	}
}

print(5);