const retryPromise = async (promiseFn, attempts) => {
	try {
		const res = await promiseFn()
		return Promise.resolve(res);
	}
	catch(err) {
		if (attempts === 0) throw err;
		return retryPromise(promiseFn, attempts - 1);
	}
}

export default retryPromise;
