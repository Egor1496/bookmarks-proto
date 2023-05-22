import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import sass from "./Layout.module.sass";

import { FilterButtons, BookmarksContext } from "../../processes/model/context";

import { MainMenu, MainHeader, MainAside, MainFooter, getGroups, getTags, getBookmarks } from "../../widgets";

import { debounce } from "../../shared/model";

const DEFAULT_TYPE_SEARCH = "title";
const DEFAULT_TYPE_SORT = "title";

const Layout = () => {

	const allTags = getTags();
	const allGroups = getGroups();

	const cleanGroups = new Array(allGroups.size).fill(false);
	const cleanTags = new Array(allTags.size).fill(false);

	const [filterName, setFilterName] = useState(["", ""]);

	const [bookmarks, setBookmarks] = useState(getBookmarks(filterName, DEFAULT_TYPE_SORT));

	const [groupLinks, setGroupLinks] = useState(allGroups);
	const [tagCloud, setTagCloud] = useState(allTags);

	const [listGroup, setListGroup] = useState(cleanGroups);
	const [listTags, setListTags] = useState(cleanTags);

	const onChangeInput = (searchState) => {
		setBookmarks(getBookmarks(filterName, DEFAULT_TYPE_SEARCH, searchState));
	};

	const setState = (setList, newList, newFilterName) => {
		setFilterName(newFilterName);
		setBookmarks(getBookmarks(newFilterName));
		setList(newList);
		setTagCloud(getTags());
	};

	const updateGroupsAndTags = () => {
		setTagCloud(getTags());
		setGroupLinks(getGroups());
	}

	const onClickGroup = (i, text) => {
		const newList = cleanGroups;
		newList[i] = !listGroup[i];
		const newFilterName = newList[i] ? [text, ""] : ["", ""];
		setListTags(cleanTags);
		setState(setListGroup, newList, newFilterName);
	}

	const onClickTags = (action, i, text) => {
		switch (action) {
			case "toogle":
				const newList = cleanTags;
				newList[i] = true;
				setState(setListTags, newList, [filterName[0], text + ","]);
				break;
			default: // clean
				setState(setListTags, cleanTags, [filterName[0], ""]);
				break;
		}
	}

	const onClickBookmarkTags = (text) => {
		setState(setListTags, cleanTags, ["", text + ","]);
		setListGroup(cleanGroups);
	}

	const contextBookmarks = [
		bookmarks,
		setBookmarks,
		filterName[0],
		updateGroupsAndTags,
		onClickBookmarkTags
	];

	return (
		<div className={sass.mainWrap}>
			<nav className={`${sass.nav}`}>
				<FilterButtons.Provider value={[listGroup, onClickGroup]}>
					<MainMenu groups={groupLinks} />
				</FilterButtons.Provider>
			</nav>
			<div className={sass["col-2"]}>
				<header className={sass.header} >
					<BookmarksContext.Provider value={debounce(onChangeInput, 500)}>
						<MainHeader />
					</BookmarksContext.Provider>
				</header>
				<main className={sass.main}>
					<article className={sass.article} >
						<BookmarksContext.Provider
							value={contextBookmarks}>
							<Outlet />
						</BookmarksContext.Provider>
					</article>
					<aside className={sass.aside} >
						<FilterButtons.Provider value={[listTags, onClickTags]}>
							<MainAside tags={tagCloud} />
						</FilterButtons.Provider>
					</aside>
				</main>
				<footer className={sass.footer}>
					<MainFooter />
				</footer>
			</div>
		</div >
	);
}

export { Layout };

// перенести из лаяута в процесс закладки и облоко тэгов групп
// сохранение настроек сортировки
// облачное хранилище закладок
// чекбоксы выбор сортировки
// варнинги и оповещения
// транспарент вид карточки
// БАГ при удалении группы очищяет все
// отображать путь закладок

/*
	правое выдвижное меню с права
	всплывающие подсказки к элементам
	инпут с иконкой
	варнинги на инпут
	боковое складывающиеся меню
	пагинация два вида
	мини уведомления на инпут, оповищение об обязательых полях
	красные звездочки на лейбл инпут, оповищение об обязательых полях
	уведомление (текст с кнопкой 3 цвета)
	микро уведомление иконка снизу текст
	загрузка файла виджет
	темная и светлая вариант для каждой темы
*/