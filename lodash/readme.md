
- difference
- union
- intersection
- intersectionBy
- intersectionWith




### Same Value Zero
- is a type of equality check
- Key characterisitics
	- +0 is same as -0 (same as `===`)
	- treats `NaN` equals to `NaN`

 - **Ceveats**
 	- Set and Map key uses sameValueZero comparion
 	- Array.prototype.includes uses sameValueZero comparison
 	- 
 - Dummy implementation of `sameValueZero`
 ```js

 	function sameValueZero(x,y) {
 		if (x === y) return true;
 		return x !== x && y !== y;
 	}
 ```


### Iterable
- iterable is an object that can be looped over one value anytime


### Methods available for assert
- assert.strictEqual
- assert.deepStrictEqual
- assert.notDeepStrictEqual
- 

#### Their usecases
- assert.strictEqual
	 - numbers
	 - strings
	 - booleans
	 - arrays/objects (same reference)

- assert.strictEqual
	- does a === check
	- for arrays and objects does a reference check
- assert.deepStrictEqual
	 - to compare the contents for the arrays/objects
	 - for arrays and objects it recursively checks for comparision
	 	- for primitives, it does === check.
- assert.nonDeepStrictEqual
	 - passes if they are not equal



### Cache Eviction Strategy
 - LRU
 - LFU