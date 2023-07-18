import React, { useContext } from "react";

import sass from "./TagСloud.module.sass"
import { IoMdPricetag } from "react-icons/io";
import { BiReset } from "react-icons/bi";

import { FilterButtons } from "../../../processes/model/context"

import { BaseButton } from "../../../shared/ui";
import { LocalStorage } from "../../../shared/model";

const TagСloud = () => {

  const {
    tags,
    tagCloud,
    activeTags,
    filter,
    sort,
    bookmarksArray,
    setBookmarks,
    setFilter,
    setTagCloud,
    setActiveTags,
  } = useContext(FilterButtons);

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

  return (
    <>
      {
        activeTags ? (
          <div className={sass.clerTags}>
            <BaseButton text="Отмена" callBack={clearTags} styleName="transparentStyle">
              <BiReset />
            </BaseButton>
          </div>
        ) : (
          <div className={sass.titleWrap}>
            <IoMdPricetag />
            <h2 className={sass.title}>Теги</h2>
          </div>
        )

      }
      <div className={sass.tagsWrap}>
        {
          [...tagCloud].map((el, i) => {
            return (
              <BaseButton
                key={el}
                text={el}
                styleNameList={[
                  "smallStyle",
                  activeTags.toLowerCase() === el.toLowerCase() && "buttonActive"
                ]}
                callBack={() => { onClickTags(el) }}
              >
                <IoMdPricetag style={{ transform: "translateY(1px)" }} />
              </BaseButton>
            )
          })
        }
      </div >
    </>
  );
}

export { TagСloud };