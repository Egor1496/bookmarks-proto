class FilterBookmarks {
	static getFiltered(filter = ["", ""], bookmarks) {
		let [groupNames, tagsNames] = filter;

		if (!groupNames === 0 && !tagsNames === 0) return bookmarks;

		groupNames = groupNames.trim().toLocaleLowerCase();
		tagsNames = tagsNames.trim().toLocaleLowerCase();

		const filtered = bookmarks.filter((elem) => {
			let suitableElem = false;

			const cleanGroup = elem.group.trim().toLowerCase();
			const cleanTags = elem.tags.trim().toLowerCase();

			let isSuitableGroup = false,
				isSuitableTags = false;

			isSuitableGroup = cleanGroup === groupNames || groupNames === "";
			isSuitableTags = ~cleanTags.indexOf(tagsNames) || tagsNames === "";

			if (isSuitableGroup && isSuitableTags) suitableElem = elem;

			return suitableElem;
		});

		return filtered;
	}
}

export { FilterBookmarks };
