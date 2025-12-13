// Fetch
// with Timeout


// if the request does not fulfills with in allotted time, reject
// if the request fulfills with in allotted time, resolve


const fetchWithTimeout = (apiPath, config, timeoutDuration) => {
  let timeoutId = undefined;
  const abortController = new AbortController();
  const signal = abortController.signal;

  return new Promise((resolve, reject) => {
    fetch(apiPath, {...config, signal})
      .then(resolve)
      .catch(reject)
      .finally(() => {
        abortController.abort();
      })

    timeoutId = setTimeout(() => {
      abortController.abort();
    }, timeoutDuration);
  });
}

export default fetchWithTimeout;
