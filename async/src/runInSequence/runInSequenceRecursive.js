const runInSequenceRecursive = async (tasks) => {
  if (!tasks.length) return;
  const task = tasks.shift();
  await task();
  return runInSequenceRecursive(tasks);
}

export default runInSequenceRecursive;
