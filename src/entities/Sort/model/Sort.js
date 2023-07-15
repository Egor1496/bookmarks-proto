class SortingBookmarks {
	static defaultType = { value: "title", sortType: true };

	static sortTitle(bookmarks, type = true) {
		return bookmarks.sort((a, b) => {
			if (!a.title) return false;
			if (!b.title) return false;
			return type ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
		});
	}

	static sortDescription(bookmarks, type = true) {
		return bookmarks.sort((a, b) => {
			if (!a.description) return false;
			if (!b.description) return false;
			return type ? a.description.localeCompare(b.description) : b.description.localeCompare(a.description);
		});
	}

	static sortTags(bookmarks, type = true) {
		return bookmarks.sort((a, b) => {
			if (!a.tags) return false;
			if (!b.tags) return false;
			return type ? a.tags.localeCompare(b.tags) : b.tags.localeCompare(a.tags);
		});
	}

	static sortGroup(bookmarks, type = true) {
		return bookmarks.sort((a, b) => {
			if (!a.group) return false;
			if (!b.group) return false;
			return type ? a.group.localeCompare(b.group) : b.group.localeCompare(a.group);
		});
	}

	static getSorted(sortObg = SortingBookmarks.defaultType, bookmarks) {
		const type = {
			title: SortingBookmarks.sortTitle,
			description: SortingBookmarks.sortDescription,
			tags: SortingBookmarks.sortTags,
			group: SortingBookmarks.sortGroup,
		};

		return type[sortObg.value.trim().toLowerCase()](bookmarks, sortObg.sortType);
	}
}

export { SortingBookmarks };
