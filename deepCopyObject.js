
const deepCopy = (obj) => {

	if(typeof obj !== 'object') {
		return obj;
	}

	if(obj === null) return ob;

	if (Array.isArray(obj)) {
		return obj.map(deepCopy);
	}

	const keys = Object.keys(obj);
	let res = {};
	keys.forEach((key) => {
		const deepCopiedItem = deepCopy(obj[key]);
		res[key] = deepCopiedItem;
		return;
	})

	return res;
}

const init = () => {
	const input1 = {
		a: {
			1: "one",
		}
	};

	const input2 = deepCopy(input1)

	console.log(input2);


	const res = {
		a: {
			1: "one",
			2 : {
				"calender": "google",
			},
			c: [1,2,3]
		}
	};

		const input3 = deepCopy(res)

	console.log(input3);

	const res2 = {
		...res,
	}

	console.log("res === res2", input1 === input2);
	console.log("res ref === res2 ref", input1.a === input2.a);

}

init();
