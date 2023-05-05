import React from "react";
import { Routes, Route } from "react-router-dom";

import "./styles/App.sass";

import {
	Error, Main,
	UIKit, Demo,
} from "../pages";

import { Layout } from "./Layout/Layout";

const App = () => {
	return (
		<div>
			<Routes>
				<Route path="/bookmarks-proto/" element={<Layout />}>
					<Route index element={<Main />} />
					{/* <Route path="/bookmarks-proto/demo" element={<Demo />} />
					<Route path="/bookmarks-proto/ui" element={<UIKit />} />
					<Route path="/bookmarks-proto/*" element={<Error />} /> */}
				</Route>
			</Routes>
		</div>
	);
};

export default App;
