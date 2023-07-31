import React from "react";
import { Outlet } from "react-router-dom";

import sass from "./Layout.module.sass";

import { storage, useStorage } from "../../../processes";

import {
	Menu,
	Header,
	Aside,
	Footer,
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
		<storage.Provider value={{
			...stateBookmarks,
			...stateFilterSort,
			...stateTagsGroups,
			...stateBaseSettings
		}}>
			<div className={sass.mainWrap} >
				<nav className={classNamesNav}>
					<Menu />
				</nav>
				<div className={sass["col-2"]}>
					<header className={sass.header} >
						<Header />
					</header>
					<main className={`${sass.main}`}>
						<article className={classNameArticle} >
							<Outlet />
						</article>
						<aside className={classNamesAside} >
							<Aside />
						</aside>
					</main>
					<footer className={sass.footer}>
						<Footer />
					</footer>
				</div>
			</div >
		</storage.Provider>
	);
}

export { Layout };

// onerror img
// баг сортировки при изменении карточки
// всплывающие подсказки к элементам
// мини уведомления на инпут и красные звездочки, оповещение об обязательых полях