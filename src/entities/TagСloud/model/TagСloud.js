class Tags {
	tags = new Set();

	getTags(filledBookmarks) {
		this.tags.clear();

		filledBookmarks.forEach((bookmark) => {
			bookmark.tags.split(",").forEach((tag) => {
				if (tag.trim()) this.tags.add(tag.trim());
			});
		});

		return [...this.tags].sort((a, b) => {
			if (a.length < 7 && b.length < 7) return a.length - b.length;
			else return a.localeCompare(b);
		});
	}

	updateState(setState, tags) {
		setState(tags);
	}
}

export { Tags };
