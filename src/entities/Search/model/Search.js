class SearchBookmarks {
	static find(textSearch = "", bookmarks) {
		textSearch = textSearch.trim().toLowerCase();

		if (!textSearch) return bookmarks;

		return bookmarks.filter((elem) => {
			let title = elem?.title || "",
				description = elem?.description || "",
				tags = elem?.tags || "";

			title = title.trim().toLowerCase();
			description = description.trim().toLowerCase();
			tags = tags.trim().toLowerCase();

			if (~title.indexOf(textSearch) || ~description.indexOf(textSearch) || ~tags.indexOf(textSearch)) return elem;
			else return false;
		});
	}
}

export { SearchBookmarks };
