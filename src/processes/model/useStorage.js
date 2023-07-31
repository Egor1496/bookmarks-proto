import { useState } from "react";

import { BookmarksArray, DEFAULT_BOOKMARKS_TMP } from "../../widgets";
import { Groups } from "../../features";
import { Tags } from "../../entities";
import { LocalStorage, JsonHelper } from "../../shared/model";

const bookmarksArray = new BookmarksArray(DEFAULT_BOOKMARKS_TMP);

const useStorage = () => {
	const DEFAULT_TYPE_SORT = { value: "title", sortType: true };

	const groups = new Groups();
	const tags = new Tags();

	const [activeTags, setActiveTags] = useState(LocalStorage.getStore("activeTags") || "");
	const [activeGroup, setActiveGroup] = useState(LocalStorage.getStore("activeGroup") || "");

	const [filter, setFilter] = useState([activeGroup, activeTags]);
	const [sort, setSort] = useState(JsonHelper.getObject(LocalStorage.getStore("sort")) || DEFAULT_TYPE_SORT);
	const [bookmarks, setBookmarks] = useState(bookmarksArray.getBookmarks(filter, sort));

	const allTags = tags.getTags(bookmarks);
	const allGroups = groups.getGroups(bookmarksArray.getBookmarks());

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
	};

	const stateBaseSettings = {
		enableGroups,
		enableTags,
		enableBg,
		setEnableGroups,
		setEnableTags,
		setEnableBg,
	};

	return {
		stateBookmarks,
		stateFilterSort,
		stateTagsGroups,
		stateBaseSettings,
	};
};

export { useStorage };
