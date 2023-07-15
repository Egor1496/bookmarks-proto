import { nanoid } from "nanoid";

import { JsonHelper, LocalStorage } from "../../../shared/model";

const bookmarksTmp = [
	// {
	// 	id: nanoid(),
	// 	link: "https://www.youtube.com/",
	// 	title: "youtube",
	// 	description: "Видеохостинг, предоставляющий пользователям услуги хранения, доставки и показа видео.",
	// 	tags: "Видео, Соц. сеть",
	// 	group: "Избранные",
	// },
	// {
	// 	id: nanoid(),
	// 	link: "https://mail.ru/",
	// 	title: "mail",
	// 	description: "Почта Mail.ru — крупнейшая бесплатная почта.",
	// 	tags: "Почта",
	// 	group: "Избранные",
	// },
	// {
	// 	id: nanoid(),
	// 	link: "https://dzen.ru",
	// 	title: "dzen",
	// 	description: "Это Дзен — платформа для создания и просмотра контента.",
	// 	tags: "Видео, Соц. сеть",
	// 	group: "Избранные",
	// },
	// {
	// 	id: nanoid(),
	// 	link: "https://translate.yandex.ru/",
	// 	title: "translate.yandex",
	// 	description: "Перевод с английского",
	// 	tags: "Переводчик",
	// 	group: "Избранные, Инструменты",
	// },
];
let bookmarks = JsonHelper.getObject(LocalStorage.getStore("bookmarks", "[]"));

if (bookmarks.length === 0) bookmarks = bookmarksTmp;

class Groups {
	groups = new Set();

	fillGroups() {
		this.groups.clear();
		bookmarks.forEach((bookmark) => {
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

const groups = new Groups();
const tags = new Tags();

const addBookmark = (bookmark) => {
	bookmarks = [...bookmarks, { ...bookmark, id: nanoid() }];
};

const deleteBookmark = (id, setBookmarks) => {
	bookmarks.forEach((el, i) => {
		if (el.id === id) {
			bookmarks.splice(i, 1);
			LocalStorage.setStore("bookmarks", JsonHelper.getJSON([...bookmarks]));
			setBookmarks(bookmarks);
		}
	});
};

const editBookmark = (id, newBookmark, setBookmarks) => {
	bookmarks.forEach((el, i) => {
		if (el.id === id) {
			bookmarks.splice(i, 1);
			LocalStorage.setStore("bookmarks", JsonHelper.getJSON([...bookmarks]));
			uploadBookmarks(newBookmark, setBookmarks);
		}
	});
};

const uploadBookmarks = (bookmark, setState) => {
	addBookmark(bookmark);
	LocalStorage.setStore("bookmarks", JsonHelper.getJSON(bookmarks));
	setState(getBookmarks());
};

const getBookmarks = (filterName, sortSelected, searchText) => {
	let filledBookmarks = Filter.getFiltered(filterName, bookmarks);
	filledBookmarks = Sorting.getSorted(sortSelected, filledBookmarks);
	filledBookmarks = Search.find(searchText, filledBookmarks);
	return filledBookmarks;
};

class Search {
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

class Filter {
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

class Sorting {
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

	static getSorted(sortObg = Sorting.defaultType, bookmarks) {
		const type = {
			title: Sorting.sortTitle,
			description: Sorting.sortDescription,
			tags: Sorting.sortTags,
			group: Sorting.sortGroup,
		};

		return type[sortObg.value.trim().toLowerCase()](bookmarks, sortObg.sortType);
	}
}

export { getBookmarks, deleteBookmark, editBookmark, uploadBookmarks, Groups, Tags };
