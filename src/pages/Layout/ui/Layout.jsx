import React from "react";
import { Outlet } from "react-router-dom";

import sass from "./Layout.module.sass";

import { storage, useStorage } from "../../../processes";

import {
	MainMenu,
	MainHeader,
	MainAside,
	MainFooter,
} from "../../../widgets";

const Layout = () => {

	const {
		stateBookmarks,
		stateFilterSort,
		stateTagsGroups,
		stateBaseSettings
	} = useStorage();

	const classNamesNav = `${sass.nav} ${!stateBaseSettings.enableGroups && sass.hide}`;
	const classNameArticle = `${sass.article} ${!stateBaseSettings.enableBg && sass.transparent}`;
	const classNamesAside = `${sass.aside} ${!stateBaseSettings.enableTags && sass.hide}`;

	return (
		<div className={sass.mainWrap}>
			<nav className={classNamesNav}>
				<storage.Provider value={{
					...stateBookmarks,
					...stateFilterSort,
					...stateTagsGroups
				}}>
					<MainMenu />
				</storage.Provider>
			</nav>
			<div className={sass["col-2"]}>
				<header className={sass.header} >
					<storage.Provider value={{
						...stateBookmarks,
						...stateFilterSort,
						...stateBaseSettings
					}}>
						<MainHeader />
					</storage.Provider>
				</header>
				<main className={`${sass.main}`}>
					<article className={classNameArticle} >
						<storage.Provider value={{
							...stateBookmarks,
							...stateFilterSort,
							...stateTagsGroups
						}}>
							<Outlet />
						</storage.Provider>
					</article>
					<aside className={classNamesAside} >
						<storage.Provider value={{
							...stateBookmarks,
							...stateFilterSort,
							...stateTagsGroups
						}}>
							<MainAside />
						</storage.Provider>
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
// баг сортировки при изменении карточки
// перенести из лаяута в процесс закладки и облоко тэгов групп
// всплывающие подсказки к элементам
// мини уведомления на инпут и красные звездочки, оповещение об обязательых полях