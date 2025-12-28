const isObject = (value) => {
	if (typeof value !== 'object') return false;
	if (value === null) return false;

	const valuePrototype = Object.getPrototypeOf(value);

	// Ensures the object is a plain object, i.e., created using {} or new Object().
	if (valuePrototype !== Object.prototype) return false;

	return true;
}


export default isObject;

/*

	What about Map, Set ? What does their prototype points to ?
	 - They have their own prototype
		 - Date.prototype
		 - Set.prototype
		 - Map.prototype
		 - Array.prototype
	
*/