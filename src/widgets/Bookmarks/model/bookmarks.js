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

let filledBookmarks;

const tags = new Set(),
	groups = new Set();

const fillTags = () => {
	tags.clear();
	filledBookmarks.forEach((bookmark) => {
		bookmark.tags.split(",").forEach((tag) => {
			if (tag.trim()) tags.add(tag.trim());
		});
	});
};

const fillGroups = () => {
	groups.clear();
	bookmarks.forEach((bookmark) => {
		bookmark.group.split(",").forEach((group) => {
			if (group.trim()) groups.add(group.trim());
		});
	});
};

const addBookmark = (bookmark) => {
	bookmarks = [...bookmarks, { ...bookmark, id: nanoid() }];
};

const deleteBookmark = (id, setBookmarks) => {
	bookmarks.forEach((el, i) => {
		if (el.id === id) {
			bookmarks.splice(i, 1);
			filledBookmarks.splice(i, 1);
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

const getTags = () => {
	fillTags();
	fillGroups();
	return [...tags].sort((a, b) => {
		if (a.length < 7 && b.length < 7) return a.length - b.length;
		else return a.localeCompare(b);
	});
};

const getGroups = () => {
	fillTags();
	fillGroups();
	return [...groups].sort((a, b) => {
		return a.localeCompare(b);
	});
};

const getBookmarks = (filterName, sortSelected = { value: "title", sortType: true }, searchText = "") => {
	filledBookmarks = filter(filterName, bookmarks);
	filledBookmarks = sort(sortSelected, filledBookmarks);
	filledBookmarks = searchBookmarks(searchText, filledBookmarks);
	return filledBookmarks;
};

const searchBookmarks = (textSearch = "", bookmarks) => {
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
};

const filter = (filter = ["", ""], bookmarks) => {
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
};

const sortTitleBookmarks = (bookmarks, type) => {
	return bookmarks.sort((a, b) => {
		if (!a.title) return false;
		if (!b.title) return false;
		return type ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
	});
};

const sortDescriptionBookmarks = (bookmarks, type) => {
	return bookmarks.sort((a, b) => {
		if (!a.description) return false;
		if (!b.description) return false;
		return type ? a.description.localeCompare(b.description) : b.description.localeCompare(a.description);
	});
};

const sortTagsBookmarks = (bookmarks, type) => {
	return bookmarks.sort((a, b) => {
		if (!a.tags) return false;
		if (!b.tags) return false;
		return type ? a.tags.localeCompare(b.tags) : b.tags.localeCompare(a.tags);
	});
};

const sortGroupBookmarks = (bookmarks, type) => {
	return bookmarks.sort((a, b) => {
		if (!a.group) return false;
		if (!b.group) return false;
		return type ? a.group.localeCompare(b.group) : b.group.localeCompare(a.group);
	});
};

const sort = (sortObg, bookmarks) => {
	const type = {
		title: sortTitleBookmarks,
		description: sortDescriptionBookmarks,
		tags: sortTagsBookmarks,
		group: sortGroupBookmarks,
	};

	return type[sortObg.value.trim().toLowerCase()](bookmarks, sortObg.sortType);
};

filledBookmarks = getBookmarks();

fillTags();
fillGroups();

export { getBookmarks, deleteBookmark, editBookmark, uploadBookmarks, getTags, getGroups };
