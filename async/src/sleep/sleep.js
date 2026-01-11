const sleep = (duration = 0) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default sleep;
