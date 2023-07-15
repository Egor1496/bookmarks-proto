class Tags {
	tags = new Set();

	fillTags(filledBookmarks) {
		this.tags.clear();
		filledBookmarks.forEach((bookmark) => {
			bookmark.tags.split(",").forEach((tag) => {
				if (tag.trim()) this.tags.add(tag.trim());
			});
		});
	}

	getTags(filledBookmarks) {
		this.fillTags(filledBookmarks);
		return [...this.tags].sort((a, b) => {
			if (a.length < 7 && b.length < 7) return a.length - b.length;
			else return a.localeCompare(b);
		});
	}
}

export { Tags };
