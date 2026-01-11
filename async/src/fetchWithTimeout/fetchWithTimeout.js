/*
	fetchWithTimeout(url, config, duration)
		.then()
		.catch()
		.finally

*/

const fetchWithTimeout = (url, config, timeoutDuration) => {
	const controller = new AbortController();
	const { signal } = controller;

	const timeoutId = setTimeout(() => {
		controller.abort();
	}, timeoutDuration);


	const updatedOptions = {...config, signal};

	return fetch(
		url,
		updatedOptions
	)
	.finally(() => {
		clearTimeout(timeoutId)
	})
}

export default fetchWithTimeout;
