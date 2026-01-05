// we are resolving even beforethe async work has completed
const mapLimit = (inputs, limit, iteratee) => {
  const result = new Array(inputs.length).fill(undefined);
  let active = 0;
  let idx = 0;
  let finished = 0;

  return new Promise((resolve, reject) => {

    const executor = (input, callback) => {
      iteratee(input, callback)
    } 

    const callbackWithIdx = (idx) => (err, value) => {
      if (err) {
        reject(result);
        return;
      }
      active--
      finished++;
      scheduler()
      result[idx] = value;
    };

    const getInputsToIterate = () => {
      const lengthToConsider = limit - active;
      const res = [];
      for (let i = 0; i < Math.min(lengthToConsider, inputs.length); i++) {
        res.push(inputs.shift());
      }
      return res;
    }

    const scheduler = () => {
      if (!inputs.length) {
        resolve(result);
        return;
      }

      const tasks = getInputsToIterate()

      while(tasks.length) {
        const task = tasks.shift();
        idx++;
        active++;
        executor(task, callbackWithIdx(idx))
      }
    }
    scheduler();
  })
}
