import { nanoid } from "nanoid";

import { SortingBookmarks, SearchBookmarks, FilterBookmarks } from "../../../entities";
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

class BookmarksArray {
	constructor(bookmarksTmp) {
		this.bookmarksTmp = bookmarksTmp;
		this.bookmarks = JsonHelper.getObject(LocalStorage.getStore("bookmarks", "[]"));

		if (this.bookmarks.length === 0) this.bookmarks = this.bookmarksTmp;
	}

	addBookmark(bookmark) {
		this.bookmarks = [...this.bookmarks, { ...bookmark, id: nanoid() }];
	}

	deleteBookmark(id, setBookmarks) {
		this.bookmarks.forEach((el, i) => {
			if (el.id === id) {
				this.bookmarks.splice(i, 1);
				LocalStorage.setStore("bookmarks", JsonHelper.getJSON([...this.bookmarks]));
				setBookmarks(this.bookmarks);
			}
		});
	}

	editBookmark(id, newBookmark, setBookmarks) {
		this.bookmarks.forEach((el, i) => {
			if (el.id === id) {
				this.bookmarks.splice(i, 1);
				LocalStorage.setStore("bookmarks", JsonHelper.getJSON([...this.bookmarks]));
				this.uploadBookmarks(newBookmark, setBookmarks);
			}
		});
	}

	uploadBookmarks(bookmark, setState) {
		this.addBookmark(bookmark);
		LocalStorage.setStore("bookmarks", JsonHelper.getJSON(this.bookmarks));
		setState(this.getBookmarks());
	}

	getBookmarks(filterName, sortSelected, searchText) {
		let filledBookmarks = FilterBookmarks.getFiltered(filterName, this.bookmarks);
		filledBookmarks = SortingBookmarks.getSorted(sortSelected, filledBookmarks);
		filledBookmarks = SearchBookmarks.find(searchText, filledBookmarks);
		return filledBookmarks;
	}
}

const bookmarksArray = new BookmarksArray(bookmarksTmp);

export { bookmarksArray }; // getBookmarks, deleteBookmark, editBookmark, uploadBookmarks,
