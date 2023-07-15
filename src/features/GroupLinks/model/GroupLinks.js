import { JsonHelper, LocalStorage } from "../../../shared/model";

class Groups {
	constructor() {
		this.bookmarks = JsonHelper.getObject(LocalStorage.getStore("bookmarks", "[]"));
	}

	groups = new Set();

	fillGroups() {
		this.groups.clear();
		this.bookmarks.forEach((bookmark) => {
			bookmark.group.split(",").forEach((group) => {
				if (group.trim()) this.groups.add(group.trim());
			});
		});
	}

	getGroups() {
		this.fillGroups();
		return [...this.groups].sort((a, b) => {
			return a.localeCompare(b);
		});
	}
}

export { Groups };
