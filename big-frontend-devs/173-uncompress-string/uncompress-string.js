// To explore with chat gpt

  function isNumber(n) {
    return typeof n === 'number' && !Number.isNaN(n);
  }


  /**
   * @param {string} str
   * @returns {string}
   */
  function uncompress(str) {
    const stack1 = [];
    const stack2 = [];

    // insert into the stack
    for (let i = 0 ; i < str.length; i++) {
	    const ele = str[i];

	      if ( i > 0 && isNumber(+stack1[i-1]) && isNumber(+ele)) {
	        const num = stack1[i-1]*10 + (+ele);
	        stack1[i-1] = num;
	        continue;			
	      }

	      if (isNumber(+ele)) {
	        stack1.push(+ele)
	        continue;
	      }
	      
	      stack1.push(ele);
    }

    console.log(stack1)

    // keeping emptying the stack unless you find opening bracket

    while(stack1.length) {
      const ele = stack1.pop();

      if (ele === '(') {
        const n = stack1.pop(); // got the number


        // mutate stack2
        let val = "";
        while(stack2.length) {
          const item = stack2.pop();
          if (item === ")") break;
          val += item;
        }

        const updatedStr = val.repeat(n);
        stack2.push(updatedStr);
        continue;
      }

      stack2.push(ele)
    }

    return stack2.reverse().join("");
  }




console.log(uncompress('3(ab)')) // 'ababab'
console.log(uncompress('3(ab2(c))'))
console.log(uncompress('3(ab2(c)2(c)'))


// 3(ab)

// if number

// [	
// 	(
// 	b
// 	a
// 	)
// 	3

// ]





// 3(ab2(c))


// 3(bc)

// resolve(n, str)
// 	returm str.repeat(n);

// compress (str)
// 	const n  = get the first char

// 		if n == number
// 		 return resolve(n, compress((bc)))

// 		return str[0]+compress(remaining);

	
// 	[	
// 		)
// 		)
// 		c
// 		(
// 		2
// 		b
// 		a
// 		(
// 		3
// 	]


// 	[	
// 		) //  removed
// 		) // removed
// 		c // removed
// 		( // removed
// 		2 // get the number
// 		b // removed
// 		a // removed
// 		( // removed
// 		3 // removed
// 	]

// 	if opening bracket
// 		get the number	= 2

// 		(

// 		find the till the next closing in the second stack
// 			const str = c



// 	[
// 		) -> 0
// 		cc
// 		b
// 		a
// 	]
	


// 3(ab2(c)2(c))
	
// 	2c = cc




//  [	
//  	c
//  	2
//  	c
//  	2
//  	b
//  	a
//  	3
//  ]


//  	cc
//  [	
//  	c
//  	c
//  	c
//  	2
//  	b
//  	a
//  	3
//  ]

