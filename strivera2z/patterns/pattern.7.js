const print = (n = 5) => {
	const bound = (n/2);
	for(let i = 0; i < bound; i++) {
		let str = '';
		for(let j = 0; j <= n; j++) {
			if(1) {
				str+="*";
			}
		}
		console.log(str);
	}
}

print(5);

/*
   *
  ***
 *****
*******


12*45
1***5
*****


9=5
5=3

*/