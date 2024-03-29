import { nanoid } from "nanoid";

import { SortingBookmarks, SearchBookmarks, FilterBookmarks } from "../../../entities";
import { JsonHelper, LocalStorage } from "../../../shared/model";

const DEFAULT_BOOKMARKS_TMP = [
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

class BookmarksArray {
	constructor(bookmarksTmp) {
		this.bookmarksTmp = bookmarksTmp;
		this.bookmarks = JsonHelper.getObject(LocalStorage.getStore("bookmarks", "[]"));

		if (this.bookmarks.length === 0) this.bookmarks = this.bookmarksTmp;
	}

	deleteBookmark(id) {
		this.bookmarks.forEach((el, i) => {
			if (el.id === id) {
				this.bookmarks.splice(i, 1);
				LocalStorage.setStore("bookmarks", JsonHelper.getJSON([...this.bookmarks]));
			}
		});
	}

	editBookmark(id, newBookmark) {
		this.bookmarks.forEach((el, i) => {
			if (el.id === id) {
				this.bookmarks.splice(i, 1);
				LocalStorage.setStore("bookmarks", JsonHelper.getJSON([...this.bookmarks]));
				this.uploadBookmarks(newBookmark);
			}
		});
	}

	uploadBookmarks(bookmark) {
		this.bookmarks = [...this.bookmarks, { ...bookmark, id: nanoid() }];
		LocalStorage.setStore("bookmarks", JsonHelper.getJSON(this.bookmarks));
	}

	getBookmarks(filterName, sortSelected, searchText) {
		let filledBookmarks = FilterBookmarks.getFiltered(filterName, this.bookmarks);
		filledBookmarks = SortingBookmarks.getSorted(sortSelected, filledBookmarks);
		filledBookmarks = SearchBookmarks.find(searchText, filledBookmarks);
		return filledBookmarks;
	}
}

export { BookmarksArray, DEFAULT_BOOKMARKS_TMP };
