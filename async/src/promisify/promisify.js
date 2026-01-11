/*
  Below the example of the function which works on callback
  - readFile(path, cb);
  - Definition of cb:
  ```
  const cb = (err, data) => {
    if(err) { ...do something }
    else consume the data
  }
  ```

  `promisify` function contract
    - accepts a func
    - returns a new function
    - returned function upon invocation returns a promise
    - Note:
      - The retuned function will be invoked with all params except the cb.

    ```
      const promisifiedFunc = promisify(readFile);

      promisifiedFunc(path)
        .then(data => {... do something })
        .catch(err => {... do something })
    ```

*/

const cb = (resolve, reject) => (err, data) => {
  if (err) {
    reject(err);
    return;
  }

  resolve(data);
}

const executor = (fn, context, args) => (resolve, reject) => {
  try {
    fn.call(context, ...args, cb(resolve, reject))
  }
  catch(err) {
    reject(err);
  }
}

const promisify = fn => {
  return function(...args) {
    return new Promise(
      executor(fn, this, args)
    );
  }
}

export default promisify;
