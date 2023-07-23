import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import sass from "./Layout.module.sass";

import { FilterButtons, BookmarksContext } from "../../processes/model/context";

import { MainMenu, MainHeader, MainAside, MainFooter, BookmarksArray, DEFAULT_BOOKMARKS_TMP } from "../../widgets";
import { Groups } from "../../features";
import { Tags } from "../../entities";
import { LocalStorage, JsonHelper } from "../../shared/model";

const DEFAULT_TYPE_SORT = { value: "title", sortType: true };

const groups = new Groups();
const tags = new Tags();

const bookmarksArray = new BookmarksArray(DEFAULT_BOOKMARKS_TMP);

const Layout = () => {
	const [activeTags, setActiveTags] = useState(LocalStorage.getStore("activeTags") || "");
	const [activeGroup, setActiveGroup] = useState(LocalStorage.getStore("activeGroup") || "");

	const [filter, setFilter] = useState([activeGroup, activeTags]);
	const [sort, setSort] = useState(JsonHelper.getObject(LocalStorage.getStore("sort")) || DEFAULT_TYPE_SORT);

	const [bookmarks, setBookmarks] = useState(bookmarksArray.getBookmarks(filter, sort));

	const allTags = tags.getTags(bookmarks);
	const allGroups = groups.getGroups();

	const [groupLinks, setGroupLinks] = useState(allGroups);
	const [tagCloud, setTagCloud] = useState(allTags);

	const [enableGroups, setEnableGroups] = useState(Boolean(Number(LocalStorage.getStore("enableGroups") || 1)));
	const [enableTags, setEnableTags] = useState(Boolean(Number(LocalStorage.getStore("enableTags") || 1)));
	const [enableBg, setEnableBg] = useState(Boolean(Number(LocalStorage.getStore("enableBg") || 1)));

	const stateBookmarks = {
		bookmarksArray,
		bookmarks,
		setBookmarks,
	};

	const stateFilterSort = {
		filter,
		sort,
		setFilter,
		setSort,
	};

	const stateTagsGroups = {
		tags,
		groups,
		tagCloud,
		groupLinks,
		activeTags,
		activeGroup,
		setTagCloud,
		setGroupLinks,
		setActiveTags,
		setActiveGroup,
	}

	const stateBaseSettings = {
		enableGroups,
		enableTags,
		enableBg,
		setEnableGroups,
		setEnableTags,
		setEnableBg,
	};

	const classNamesNav = `${sass.nav} ${!enableGroups && sass.hide}`;
	const classNameArticle = `${sass.article} ${!enableBg && sass.transparent}`;
	const classNamesAside = `${sass.aside} ${!enableTags && sass.hide}`;

	return (
		<div className={sass.mainWrap}>
			<nav className={classNamesNav}>
				<FilterButtons.Provider value={{
					...stateBookmarks,
					...stateFilterSort,
					...stateTagsGroups
				}}>
					<MainMenu />
				</FilterButtons.Provider>
			</nav>
			<div className={sass["col-2"]}>
				<header className={sass.header} >
					<BookmarksContext.Provider value={{
						...stateBookmarks,
						...stateFilterSort
					}}>
						<MainHeader state={stateBaseSettings} />
					</BookmarksContext.Provider>
				</header>
				<main className={`${sass.main}`}>
					<article className={classNameArticle} >
						<BookmarksContext.Provider value={{
							...stateBookmarks,
							...stateFilterSort,
							...stateTagsGroups
						}}>
							<Outlet />
						</BookmarksContext.Provider>
					</article>
					<aside className={classNamesAside} >
						<FilterButtons.Provider value={{
							...stateBookmarks,
							...stateFilterSort,
							...stateTagsGroups
						}}>
							<MainAside />
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

// onerror img

// при добавлении карточек не обновляется облако тэгов и группы

// баг сортировки при изменении карточки

// перенести из лаяута в процесс закладки и облоко тэгов групп
// облачное хранилище закладок

/*
	всплывающие подсказки к элементам
	варнинги на инпут
	пагинация два вида
	мини уведомления на инпут, оповищение об обязательых полях
	красные звездочки на лейбл инпут, оповищение об обязательых полях
*/