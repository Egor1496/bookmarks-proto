import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import sass from "./Layout.module.sass";

import { FilterButtons, BookmarksContext } from "../../processes/model/context";

import { MainMenu, MainHeader, MainAside, MainFooter, getGroups, getTags, getBookmarks } from "../../widgets";

import { debounce, getStore, setStore, getObject, getJSON } from "../../shared/model";

const DEFAULT_TYPE_SORT = { value: "title", sortType: true };

const Layout = () => {
	const [activeTags, setActiveTags] = useState(getStore("activeTags") || "");
	const [activeGroup, setActiveGroup] = useState(getStore("activeGroup") || "");

	const [filter, setFilter] = useState([activeGroup, activeTags]);
	const [sort, setSort] = useState(getObject(getStore("sort")) || DEFAULT_TYPE_SORT);

	const [bookmarks, setBookmarks] = useState(getBookmarks(filter, sort));

	const allTags = getTags();
	const allGroups = getGroups();

	const [groupLinks, setGroupLinks] = useState(allGroups);
	const [tagCloud, setTagCloud] = useState(allTags);

	const onAddBookmarks = (newBookmark) => {
		setBookmarks(getBookmarks(filter, sort));
	}

	const onChangeInput = (searchState) => {
		setBookmarks(getBookmarks(filter, sort, searchState));
	};

	const updateFilter = () => {
		setTagCloud(getTags());
		setGroupLinks(getGroups());
	}

	const onClickGroup = (groupName) => {
		const newText = groupName === activeGroup ? "" : groupName;
		const newFilter = [newText, ""];
		setFilter(newFilter);
		setBookmarks(getBookmarks(newFilter, sort));
		setActiveGroup(newText);
		setTagCloud(getTags());
		setStore("activeTags", "");
		setStore("activeGroup", groupName);
		setActiveTags("");
	}

	const onClickTags = (tagName) => {
		const newFilter = [filter[0], tagName];
		setFilter(newFilter);
		setBookmarks(getBookmarks(newFilter, sort));
		setActiveTags(tagName);
		setStore("activeTags", tagName);
		setTagCloud(getTags());
	}

	const clearTags = () => {
		const newFilter = [filter[0], ""];
		setFilter(newFilter);
		setBookmarks(getBookmarks(newFilter, sort));
		setActiveTags("");
		setStore("activeTags", "");
		setTagCloud(getTags());
	}

	const onClickBookmarkTags = (tagName) => {
		const newFilter = ["", tagName];
		setFilter(newFilter);
		setBookmarks(getBookmarks(newFilter, sort));
		setActiveTags(tagName);
		setStore("activeTags", tagName);
		setActiveGroup("");
		setStore("activeGroup", "");
		setTagCloud(getTags());
	}

	const onSortSelect = (newSort) => {
		setSort(newSort);
		console.log(sort);
		setBookmarks(getBookmarks(filter, newSort))
		setStore("sort", getJSON(newSort));
	};

	const contextBookmarks = [
		bookmarks,
		onAddBookmarks,
		filter[0],
		updateFilter,
		onClickBookmarkTags,
		onSortSelect,
	];

	return (
		<div className={sass.mainWrap}>
			<nav className={`${sass.nav}`}>
				<FilterButtons.Provider value={[onClickGroup, activeGroup]}>
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
						<FilterButtons.Provider value={[onClickTags, clearTags, activeTags]}>
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

// баг сравнение похожих групп 123 === 12
// перенести из лаяута в процесс закладки и облоко тэгов групп
// облачное хранилище закладок
// транспарент вид карточки
// БАГ при удалении группы очищяет все
// отображать путь закладок
// переделать масив активных вкладок на текст активной вкладки

/*
	правое выдвижное меню с права
	всплывающие подсказки к элементам
	варнинги на инпут
	боковое складывающиеся меню
	пагинация два вида
	мини уведомления на инпут, оповищение об обязательых полях
	красные звездочки на лейбл инпут, оповищение об обязательых полях
	темная и светлая вариант для каждой темы
*/