const setStore = (key = "null", value = "") => {
	localStorage.setItem(key, value);
};

const getStore = (key = "null", defaultValue = "") => {
	return localStorage.getItem(key) || defaultValue;
};

export { setStore, getStore };
