class JsonHelper {
	static getJSON(obj) {
		return obj ? JSON.stringify(obj) : null;
	}
	static getObject(json) {
		return json ? JSON.parse(json) : null;
	}
}

export { JsonHelper };
