const retry = async (fn, retries) => {
  try {
    const res = await fn();
    return res;
  }
  catch(err) {
    if (retries === 0) throw err;
    return retry(fn, retries - 1);
  }
}

const executePromises = retries => (chain, promiseItem) => {
  return chain
    .then(async (resolvedData) => {
      return [...resolvedData, await retry(promiseItem, retries)]
    })
}

const runInSequenceWithRetryV3 = async (promises, retries) => {
  return promises.reduce(executePromises(retries), Promise.resolve([]));
}

export default runInSequenceWithRetryV3;
