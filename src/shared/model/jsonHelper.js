const getJSON = (obj) => {
	return obj ? JSON.stringify(obj) : null;
};

const getObject = (json) => {
	return json ? JSON.parse(json) : null;
};

export { getJSON, getObject };
