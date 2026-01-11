const runInSequenceIterative = async (promises) => {
  for (const promiseItem of promises) {
    await promiseItem();
  }
}

export default runInSequenceIterative;
