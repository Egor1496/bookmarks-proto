import { getURL } from "./URL";

class FillBookmark {
	static getId(id) {
		const filledId = id;
		return filledId;
	}

	static getLink(link = "") {
		const filledLink = link;
		return filledLink;
	}

	static getImgLink(url) {
		const filledimgLink = url.hostname;
		return filledimgLink;
	}

	static getTitle(title = "", link) {
		const url = getURL(link);
		let filledTitle = title,
			isTitle = title.replace(/(.|,|-|_|;|:|'|)/gi, "");

		if (!isTitle) {
			filledTitle = url.hostname.replace(/(.com|www.|.ru|.net|.org|.biz|dvd.|.io)/g, "");
		}

		return filledTitle;
	}

	static getDescription(description = "") {
		const filledDescription = description;
		return filledDescription;
	}

	static getTags(tags = "") {
		const filledTags = tags.trim() && tags.toLowerCase().trim().split(",");
		return filledTags;
	}

	static getGroup(group = "") {
		const filledGroup = group.trim() && group.toLowerCase().trim().split(",");
		return filledGroup;
	}
}

export { FillBookmark };
