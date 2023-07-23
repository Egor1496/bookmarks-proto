import React, { useContext } from "react";

import sass from "./GroupLinks.module.sass";
import { AiFillFolderOpen } from 'react-icons/ai';

import { Store } from "../../../processes/model/context"

import { BaseButton } from "../../../shared/ui";
import { LocalStorage } from "../../../shared/model";

const GroupLinks = () => {

  const {
    bookmarksArray,
    tags,
    groupLinks,
    sort,
    setBookmarks,
    setFilter,
    setTagCloud,
    setActiveTags,
    setActiveGroup,
    activeGroup
  } = useContext(Store);

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

  return (
    <div className={sass.main}>
      {
        [...groupLinks].map((el) => {
          const isPressed = activeGroup.toLowerCase() === el.toLowerCase();
          return (
            <BaseButton
              key={el} text={el}
              callBack={() => { onClickGroup(el, isPressed) }}
              styleNameList={[
                "transparentStyle",
                isPressed && "buttonActive"
              ]}
            ><AiFillFolderOpen /></BaseButton>
          )
        })
      }
    </div >
  );
}

export { GroupLinks };