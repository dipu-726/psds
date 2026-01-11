/*
  Problem Statement
    - Write a function timeout(ms).

  Task
    - Returns a Promise
    - Rejects after ms milliseconds

  Expected Usage
    timeout(1000).catch(() => console.log("Timed out"))

*/
const timeoutPromise  = (duration) => {

    const executor = (resolve, reject) => {
      setTimeout(reject, duration, new Error("Timeout Out"));
    }

    return new Promise(executor)
}

export default timeoutPromise;
