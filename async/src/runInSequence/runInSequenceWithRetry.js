const runInSequenceWithRetry = async (promises, retries) => {
  const result = [];

  for (const promiseItem of promises) {
    let attempts = retries;

    while (true) {
      try {
        const res = await promiseItem();
        result.push({res, err: undefined});
      } catch (err) {
        if (attempts === 0) {
          result.push({err, res: undefined})
          break;
        }
        attempts--;
      }
    }
  }
}

export default runInSequenceWithRetry;
