
// const executorWithTimeout = (fn, timeoutDuration) => {

// 	return new Promise((resolve, reject) => {

// 		const timeoutId = setTimeout(() => {
// 			reject(new Error("Timeout Error"));
// 		}, timeoutDuration)

// 		fn()
// 			.then(resolve)
// 			.catch(reject)
// 			.finally(() => {
// 				clearTimeout(timeoutId)
// 			})
// 	})

	
// }

// const promiseWithRetries = async (promiseFn, attempts, duration) => {
		
// 	const makeAnAttempt = async (attemptsLeft) => {
// 		try {
// 			return await executorWithTimeout(promiseFn, duration);
// 		}
// 		catch(err) {
// 			if (attemptsLeft === 0) throw err;
// 			return makeAnAttempt(attemptsLeft - 1)
// 		}
// 	}

// 	return makeAnAttempt(attempts)
// }

// export promiseWithDelayAndTimeout;
