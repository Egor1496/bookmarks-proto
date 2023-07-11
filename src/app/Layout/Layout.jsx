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

	const [enableTags, setEnableTags] = useState(Boolean(Number(getStore("enableTags") || 1)));
	const [enableGroups, setEnableGroups] = useState(Boolean(Number(getStore("enableGroups") || 1)));
	const [enableBg, setEnableBg] = useState(Boolean(Number(getStore("enableBg") || 1)));

	const onAddBookmarks = () => {
		setBookmarks(getBookmarks(filter, sort));
	}

	const onChangeInput = (searchState) => {
		setBookmarks(getBookmarks(filter, sort, searchState));
	};

	const updateFilter = () => {
		setTagCloud(getTags());
		setGroupLinks(getGroups());
	}

	const onClickGroup = (groupName, isPressed) => {
		const newText = isPressed ? "" : groupName;
		const newFilter = [newText, ""];
		setFilter(newFilter);
		setBookmarks(getBookmarks(newFilter, sort));
		setActiveGroup(newText);
		setTagCloud(getTags());
		setStore("activeTags", "");
		setStore("activeGroup", newText);
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
		setBookmarks(getBookmarks(filter, newSort))
		setStore("sort", getJSON(newSort));
	};

	const enableSelectGroup = (isChecked) => {
		setEnableGroups(isChecked);
		setStore("enableGroups", Number(isChecked));
	}

	const enableSelectTags = (isChecked) => {
		setEnableTags(isChecked);
		setStore("enableTags", Number(isChecked));
	}

	const enableSelectBg = (isChecked) => {
		setEnableBg(isChecked);
		setStore("enableBg", Number(isChecked));
	}

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
			<nav className={`${sass.nav} ${!enableGroups && sass.hide}`}>
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
					<article className={`${sass.article} ${!enableBg && sass.transparent}`} >
						<BookmarksContext.Provider
							value={contextBookmarks}>
							<Outlet />
						</BookmarksContext.Provider>
					</article>
					<aside className={`${sass.aside} ${!enableTags && sass.hide}`} >
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