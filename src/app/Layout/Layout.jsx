import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import sass from "./Layout.module.sass";

import { FilterButtons, BookmarksContext } from "../../processes/model/context";

import { MainMenu, MainHeader, MainAside, MainFooter, bookmarksArray } from "../../widgets";
import { Groups } from "../../features";
import { Tags } from "../../entities";
import { debounce, LocalStorage, JsonHelper } from "../../shared/model";

const DEFAULT_TYPE_SORT = { value: "title", sortType: true };

const groups = new Groups();
const tags = new Tags();

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

	const [enableTags, setEnableTags] = useState(Boolean(Number(LocalStorage.getStore("enableTags") || 1)));
	const [enableGroups, setEnableGroups] = useState(Boolean(Number(LocalStorage.getStore("enableGroups") || 1)));
	const [enableBg, setEnableBg] = useState(Boolean(Number(LocalStorage.getStore("enableBg") || 1)));

	const onAddBookmarks = () => {
		setBookmarks(bookmarksArray.getBookmarks(filter, sort));
	}

	const onChangeInput = (searchState) => {
		setBookmarks(bookmarksArray.getBookmarks(filter, sort, searchState));
	};

	const updateFilter = () => {
		setTagCloud(tags.getTags(bookmarks));
		setGroupLinks(groups.getGroups());
	}

	const onClickGroup = (groupName, isPressed) => {
		const newText = isPressed ? "" : groupName;
		const newFilter = [newText, ""];
		const newBookmark = bookmarksArray.getBookmarks(newFilter, sort);
		setFilter(newFilter);
		setBookmarks(newBookmark);
		setActiveGroup(newText);
		setTagCloud(tags.getTags(newBookmark));
		LocalStorage.setStore("activeTags", "");
		LocalStorage.setStore("activeGroup", newText);
		setActiveTags("");
	}

	const onClickTags = (tagName) => {
		const newFilter = [filter[0], tagName];
		const newBookmark = bookmarksArray.getBookmarks(newFilter, sort);
		setFilter(newFilter);
		setBookmarks(newBookmark);
		setActiveTags(tagName);
		setTagCloud(tags.getTags(newBookmark));
		LocalStorage.setStore("activeTags", tagName);
	}

	const clearTags = () => {
		const newFilter = [filter[0], ""];
		const newBookmark = bookmarksArray.getBookmarks(newFilter, sort);
		setFilter(newFilter);
		setBookmarks(newBookmark);
		setActiveTags("");
		setTagCloud(tags.getTags(newBookmark));
		LocalStorage.setStore("activeTags", "");
	}

	const onClickBookmarkTags = (tagName) => {
		const newFilter = ["", tagName];
		const newBookmark = bookmarksArray.getBookmarks(newFilter, sort);
		setFilter(newFilter);
		setBookmarks(newBookmark);
		setActiveTags(tagName);
		setActiveGroup("");
		setTagCloud(tags.getTags(newBookmark));
		LocalStorage.setStore("activeTags", tagName);
		LocalStorage.setStore("activeGroup", "");
	}

	const onSortSelect = (newSort) => {
		setSort(newSort);
		setBookmarks(bookmarksArray.getBookmarks(filter, newSort))
		LocalStorage.setStore("sort", JsonHelper.getJSON(newSort));
	};

	const enableSelectGroup = (isChecked) => {
		setEnableGroups(isChecked);
		LocalStorage.setStore("enableGroups", Number(isChecked));
	}

	const enableSelectTags = (isChecked) => {
		setEnableTags(isChecked);
		LocalStorage.setStore("enableTags", Number(isChecked));
	}

	const enableSelectBg = (isChecked) => {
		setEnableBg(isChecked);
		LocalStorage.setStore("enableBg", Number(isChecked));
	}

	const contextBookmarks = [
		bookmarks,
		onAddBookmarks,
		filter[0],
		updateFilter,
		onClickBookmarkTags,
		onSortSelect,
	];

	const classNamesNav = `${sass.nav} ${!enableGroups && sass.hide}`;
	const classNameArticle = `${sass.article} ${!enableBg && sass.transparent}`;
	const classNamesAside = `${sass.aside} ${!enableTags && sass.hide}`;

	return (
		<div className={sass.mainWrap}>
			<nav className={classNamesNav}>
				<FilterButtons.Provider value={[onClickGroup, activeGroup]}>
					<MainMenu groups={groupLinks} />
				</FilterButtons.Provider>
			</nav>
			<div className={sass["col-2"]}>
				<header className={sass.header} >
					<BookmarksContext.Provider value={debounce(onChangeInput, 500)}>
						<MainHeader
							enableSelectGroup={enableSelectGroup}
							enableGroups={enableGroups}
							enableSelectTags={enableSelectTags}
							enableTags={enableTags}
							enableSelectBg={enableSelectBg}
							enableBg={enableBg}
						/>
					</BookmarksContext.Provider>
				</header>
				<main className={`${sass.main}`}>
					<article className={classNameArticle} >
						<BookmarksContext.Provider
							value={contextBookmarks}>
							<Outlet />
						</BookmarksContext.Provider>
					</article>
					<aside className={classNamesAside} >
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

// логотип BM и MN и в центре Bookmarks / Notes

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