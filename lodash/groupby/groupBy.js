import isObject from '../isObject/index.js'

const isArray = arr => Array.isArray(arr);

const makeGroup = (iteratee, groupedByValues, item) => {
	const val = iteratee(item);
	if (groupedByValues[val]) {
		groupedByValues[val].push(item);
	}
	else {
		groupedByValues[val] = [item];
	}

	return groupedByValues;
}


const groupArrayByIteratee = (collection, iteratee) => {

	const makeGroupForAnItem = (groupedByValues, item) => {
		return makeGroup(iteratee, groupedByValues, item);
	}
	const result = collection.reduce(makeGroupForAnItem, {});
	return result;
}


const groupOBjectByIteratee = (collection, iteratee) => {
	
	const makeGroupForAnItemFromObject = (groupedByValues, key) => {
		const item = collection[key];
		return makeGroup(iteratee, groupedByValues, item);
	}

	const result = Object.keys().reduce(makeGroupForAnItemFromObject, {})
	return result;
}

const groupBy = (collection, iteratee) => {

	if(isArray(collection)) {
		return groupArrayByIteratee(collection, iteratee);
	}

	if(isObject(collection)) {
		return groupOBjectByIteratee(collection, iteratee);
	}

	return {};
}

export default groupBy;
