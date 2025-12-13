// print a pattern - square - outer loop

const print = (n) => {
	for (let i = 0 ; i < n; i++) {
		let str = "";
		for (let j = 0 ; j < n; j++) {
			if (i === 0 || i === n-1) {
				str+="*";
			}
			else if (j === 0 || j === n-1) {
				str+="*";
			}
			else {
				str+=" "
			}
		}
		console.log(str);
	}
}

// print(6);

/*

******
*    *
*    *
*    *
*    *
******


*/

// outer loop with number


const printWithNumber = (n) => {
	for (let i = 0 ; i < n; i++) {
		let str = "";
		for (let j = 0 ; j < n; j++) {
			if (i === 0 || i === n-1) {
				str+=n;
			}
			else if (j === 0 || j === n-1) {
				str+=n;
			}
			else {
				str+=" "
			}
		}
		console.log(str);
	}
}

printWithNumber(7);
