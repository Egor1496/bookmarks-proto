import { FillBookmark, getURL } from "../../../shared/model";

const fillBookmark = (bookmark) => {
	const url = getURL(FillBookmark.getLink(bookmark.link));
	const filledBookmark = {
		id: FillBookmark.getId(bookmark.id),
		link: FillBookmark.getLink(bookmark.link),
		imgLink: FillBookmark.getImgLink(url),
		title: bookmark.title,
		description: FillBookmark.getDescription(bookmark.description),
		tags: FillBookmark.getTags(bookmark.tags),
		group: FillBookmark.getGroup(bookmark.group),
	};
	return filledBookmark;
};

export { fillBookmark };
