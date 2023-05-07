import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import sass from "./Layout.module.sass";

import { FilterButtons, BookmarksContext } from "../../processes/model/context";

import { MainMenu, MainHeader, MainAside, MainFooter, getGroups, getTags, getBookmarks } from "../../widgets";

const Layout = () => {

	const allTags = getTags();
	const allGroups = getGroups();

	const cleanGroups = new Array(allGroups.size).fill(false);
	const cleanTags = new Array(allTags.size).fill(false);

	const [filterName, setFilterName] = useState(["", ""]);

	const [bookmarks, setBookmarks] = useState(getBookmarks(filterName, "title"));

	const [groupLinks, setGroupLinks] = useState(allGroups);
	const [tagCloud, setTagCloud] = useState(allTags);

	const [listGroup, setListGroup] = useState(cleanGroups);
	const [listTags, setListTags] = useState(cleanTags);

	const [searchState, setSearchState] = useState("");

	const onChangeInput = (e) => {
		setBookmarks((prev) => {
			return getBookmarks(filterName, "title", searchState);
		});
	}

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
				const newList = [...listTags];
				newList[i] = !newList[i];
				let newFilterName;
				if (newList[i])
					newFilterName = [filterName[0], text + "," + filterName[1]];
				else
					newFilterName = [filterName[0], filterName[1].replace(text + ",", "")];
				setState(setListTags, newList, newFilterName);
				break;
			case "clean":
				setState(setListTags, cleanTags, [filterName[0], ""]);
				break;
		}
	}

	const contextBookmarks = [
		bookmarks,
		setBookmarks,
		filterName[0],
		updateGroupsAndTags
	];

	return (
		<div className={sass.mainWrap}>
			<nav className={`${sass["col-1"]} ${sass.nav}`}>
				<FilterButtons.Provider value={[listGroup, onClickGroup]}>
					<MainMenu groups={groupLinks} />
				</FilterButtons.Provider>
			</nav>
			<div className={sass["col-2"]}>
				<header className={sass.header} >
					<BookmarksContext.Provider value={[searchState, setSearchState, onChangeInput]}>
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
				<footer className={sass.footer} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
					<MainFooter />
				</footer>
			</div>
		</div >
	);
}

export { Layout };

// перенести из лаяута в процесс закладки и облоко тэгов групп
// сохранение настроек темы и выбора вида и поиска и сортировки
// облачное хранилище закладок
// чекбоксы выбор поиска и сортировки
// перекинуть темы в настройки
// темы цветами, а не цифрами
// вид отображения карточек
// варнинги и оповещения
// кнопка бэкап закладок