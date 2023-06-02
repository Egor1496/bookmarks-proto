import { nanoid } from "nanoid";

import { getJSON, setStore, getStore, getObject } from "../../../shared/model";

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

let bookmarks = getObject(getStore("bookmarks", "[]"));

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
			setStore("bookmarks", getJSON([...bookmarks]));
			setBookmarks(bookmarks);
		}
	});
};

const editBookmark = (id, newBookmark, setBookmarks) => {
	bookmarks.forEach((el, i) => {
		if (el.id === id) {
			bookmarks.splice(i, 1);
			setStore("bookmarks", getJSON([...bookmarks]));
			uploadBookmarks(newBookmark, setBookmarks);
		}
	});
};

const uploadBookmarks = (bookmark, setState) => {
	addBookmark(bookmark);
	setStore("bookmarks", getJSON(bookmarks));
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

const getBookmarks = (filterName, sortType, searchText) => {
	filledBookmarks = filter(filterName, bookmarks);
	filledBookmarks = sort(sortType, filledBookmarks);
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

		isSuitableGroup = ~cleanGroup.indexOf(groupNames) || groupNames === "";
		isSuitableTags = ~cleanTags.indexOf(tagsNames) || tagsNames === "";

		if (isSuitableGroup && isSuitableTags) suitableElem = elem;

		return suitableElem;
	});

	return filtered;
};

const sortTitleBookmarks = (bookmarks) => {
	return bookmarks.sort((a, b) => {
		if (!a.title) return false;
		if (!b.title) return false;
		return a.title.localeCompare(b.title);
	});
};

const sortDescriptionBookmarks = (bookmarks) => {
	return bookmarks.sort((a, b) => {
		if (!a.description) return false;
		if (!b.description) return false;
		return a.description.localeCompare(b.description);
	});
};

const sort = (sortType = "title", bookmarks) => {
	const type = {
		title: sortTitleBookmarks,
		description: sortDescriptionBookmarks,
	};

	return type[sortType.trim().toLowerCase()](bookmarks);
};

filledBookmarks = getBookmarks();

fillTags();
fillGroups();

export { getBookmarks, deleteBookmark, editBookmark, uploadBookmarks, getTags, getGroups };
