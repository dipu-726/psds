
  // function normalize(value) {
  //   if (value === null || typeof value !== 'object') return value;

  //   if (Array.isArray(value)) {
  //     return value.map(normalize);
  //   }

  //   // For objects, sort keys and normalize values
  //   const sortedKeys = Object.keys(value).sort();
  //   const normalizedObj = {};
  //   for (const key of sortedKeys) {
  //     normalizedObj[key] = normalize(value[key]);
  //   }
  //   return normalizedObj;
  // }

/*
	Problems to consider

	1. using args as a Map key is broken
		- args is a new array in every call
		- Thus array are completed by reference, not by value,
		- This means cache hit will never occur.
	
	2. Global cache causes memory leak.
		- shared across all memoized functions
		- memory is never released
		- unbounded memory growth

	3. No cache eviction and size limit 
		- cache size limits
		- cache eviction like LRU is missing
		- manual clearance is also not present.

	4. No support for this context

	5. No handling of non-primitive arguments
		- can not be safely stringifies (need to understand this better)
		- hashing or weak maps /

	6. No error handling
		- if the fn throws error, it should not be cached
		- we don't handle this.

	7. Weak Map based implement
		- how it prevents memory leaks
	8. TTL based expiration
		- expiresAt
	9. Async memoization
		- avoid duplicate API Calls
	10. Plug in
		- LRU, LFU
*/

/*
	config = {
		maxSize: 1000,
		ttl: 10,
	};
	
*/ 

const DEFAULT_MAX_SIZE = 1000;
const DEFAULT_CACHE_TTL = Infinity;
const EMPTY_OBJECT = {};

const makeKey = (resolver) => {
}

function shouldEvict(cache, maxSize) {
	return cache.size >= maxSize;
}

function defaultKeyResolver(args) {
	return args[0];
}

const memoize = (fn, config = EMPTY_OBJECT) => {
	const {
		maxSize = DEFAULT_MAX_SIZE,
		ttl = DEFAULT_CACHE_TTL,
		keyResolver = defaultKeyResolver
	} = config;
	const cache = new Map();

	function memoizedFn(...args) {
		const now = Date.now();
		const key = keyResolver(args);
		const entry = cache.get(key);

		if(entry) {
			if(entry.expiresAt > now) return entry.result;
			cache.delete(key);
		}

		try {
			const result = fn.apply(this, args);
			cache.set(key, { result, expiresAt: Date.now() + ttl });
			if (shouldEvict(cache, maxSize)) {
				const keyToEvict = cache.keys().next().value;
				cache.delete(keyToEvict);
			}
			return result;
		}
		catch(err) {
			cache.delete(key);
			throw err;
		}
	}

	return memoizedFn;
}

export default memoize;
