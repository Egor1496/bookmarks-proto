class Groups {
	groups = new Set();

	getGroups(bookmarks) {
		this.groups.clear();

		bookmarks.forEach((bookmark) => {
			bookmark.group.split(",").forEach((group) => {
				if (group.trim()) this.groups.add(group.trim());
			});
		});

		return [...this.groups].sort((a, b) => {
			return a.localeCompare(b);
		});
	}

	updateState(setState, groups) {
		setState(groups);
	}
}

export { Groups };
