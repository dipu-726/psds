const executeWithRetry = async (fn, attempts) => {
  try {
    const res = await fn();
    return res;
  } catch (err) {
    if (attempts <= 0) return throw err;
    return executeWithRetry(fn, attempts - 1)
  }
}

const runInSequenceWithRetryV2 = async (promises, retries) => {
  const result = [];
  for (const promiseItem of promises) {
    try {
      const res = await executeWithRetry(promiseItem, retries);
      result.push({res, err: undefined})
    } catch (err) {
      result.push({res: undefined, err});
    }
  }
  return result;
}

export default runInSequenceWithRetryV2;
