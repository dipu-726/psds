### what is Composition? create a pipe()

```js
what is Composition? It is actually not that difficult to understand, see @dan_abramov 's explanation.

Here you are asked to create a pipe() function, which chains multiple functions together to create a new function.

Suppose we have some simple functions like this

const times = (y) =>  (x) => x * y
const plus = (y) => (x) => x + y
const subtract = (y) =>  (x) => x - y
const divide = (y) => (x) => x / y
Your pipe() would be used to generate new functions

pipe([
  times(2),
  times(3)
])  
// x * 2 * 3
pipe([
  times(2),
  plus(3),
  times(4)
]) 
// (x * 2 + 3) * 4
pipe([
  times(2),
  subtract(3),
  divide(4)
]) 
// (x * 2 - 3) / 4
notes

to make things simple, functions passed to pipe() will all accept 1 argument


Solution


/**
 * @param {Array<(arg: any) => any>} funcs 
 * @return {(arg: any) => any}
 */

const composeFuncs = (result, func, idx) => {
	return func(result);
}

function pipe(funcs) {
	return function(userInput) {
		const result = funcs.reduce(composeFuncs, userInput);
		return result;
	}
}


```

### Promise.race

```js

/**
 * @param {Array<Promise>} promises
 * @return {Promise}
 */
function race(promises) {
  const executor = (resolve, reject) => {
    const iterateProimises = (promise) => {
      promise
        .then(resolve)
        .catch(reject)
    }

    promises.forEach(iterateProimises);
  }

  return new Promise(executor)
}
```

