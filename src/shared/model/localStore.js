class LocalStorage {
	static setStore(key = "null", value = "") {
		localStorage.setItem(key, value);
	}
	static getStore(key = "null", defaultValue = "") {
		return localStorage.getItem(key) || defaultValue;
	}
}

export { LocalStorage };
