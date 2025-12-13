// include hasOwnProperty checks


const getUpdatedKey = (prefix, key) => {
	if (!prefix) return key;
	return `${prefix}.${key}`;
}

const flattenAnObject = (obj, prefix) => (acc, key) => {
	const updatedKey = getUpdatedKey(prefix, key);
	const item = obj[key];

	if(typeof item === 'object' && !Array.isArray(item) && item !== null) {
		const res = flat(obj[key], updatedKey);
		return {
			...acc,
			...res,
		};
	}

	acc[updatedKey] = obj[key];
	return acc;
}

const flat = (obj, prefix = '') => {
	const keys = Object.keys(obj);
	const flattendObject = keys.reduce(flattenAnObject(obj, prefix), {});
	return flattendObject;
}

const init = () => {
	console.log(flat({
		  user: {
		    name: 'John',
		    address: {
		      street: '123 Main St',
		      city: 'Anytown',
		      zip: {
		        code: '12345',
		        area: 'Central'
		      }
		    },
		    age: 30
		  },
		  hero: "asd",
	}));
}

init();


// {
//   'user.name': 'John',
//   'user.address.street': '123 Main St',
//   'user.address.city': 'Anytown',
//   'user.address.zip.code': '12345',
//   'user.address.zip.area': 'Central',
//   'user.age': 30
// }