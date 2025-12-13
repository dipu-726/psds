const flattenAnArray = (acc, element) => {
	if (Array.isArray(element)) {
		const res = flat(element);
		acc.push(...res);
		return acc;
	}

	acc.push(element);
	return acc;
}

const flat  = (arr) => {
	const flattendArray = arr.reduce(flattenAnArray,[]);
	return flattendArray;
}

const init = () => {
	console.log(flat([1,[1,2]]));
	console.log(flat([1, [1,2,[3,4]]]));
}

init();