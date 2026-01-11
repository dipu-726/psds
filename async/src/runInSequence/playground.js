const promiseGenerator = (duration) => {
  console.log("promise generator is called ", duration);

  return () => new Promise(resolve => {
    setTimeout(resolve, duration, duration);
  })
}

const list = [
  promiseGenerator(100),
  promiseGenerator(200),
  promiseGenerator(300),
  promiseGenerator(400),
  promiseGenerator(500),
]
