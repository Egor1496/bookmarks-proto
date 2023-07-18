import React, { useContext, useState } from "react";

import sass from "./Main.module.sass"

import { BookmarksContext } from "../../../processes/model/context";
import { Bookmarks } from "../../../widgets";
import { SelectStyleBookmark, GetFile, AddBookmark, LoadBookmark } from "../../../features";
import { Sort } from "../../../entities";
import { LocalStorage } from "../../../shared/model";

const Main = () => {

  const {
    bookmarksArray,
    bookmarks,
    tags,
    groups,
    filter,
    sort,
    setBookmarks,
    setTagCloud,
    setGroupLinks,
    onSortSelect,
  } = useContext(BookmarksContext);

  const stateUpdateBookamrks = {
    bookmarks,
    bookmarksArray,
    tags,
    groups,
    filter,
    sort,
    setBookmarks,
    setTagCloud,
    setGroupLinks,
  }

  const defStyleNumber = LocalStorage.getStore("styleNumber", 1);

  const [styleNumber, setStyleNumber] = useState(defStyleNumber);

  const onClickStyleBookmarks = (number) => {
    LocalStorage.setStore("styleNumber", number);
    setStyleNumber(number);
  }

  return (
    <div className={sass.main}>
      <div className={sass.mainWrap}>
        <div className={sass.inner}>
          <div className={sass.countBookmarks}>{filter[0] || "Всего"} - {bookmarks.length}</div>
          <div className={sass.buttonWrap}>
            <Sort onAcept={onSortSelect} />
            <SelectStyleBookmark setStyleNumber={onClickStyleBookmarks} />
          </div>
        </div>
        <div className={sass.inner}>
          <div className={sass["sort-wrap"]}>
            <GetFile />
          </div>
          <div className={sass["sort-wrap"]}>
            <AddBookmark stateUpdateBookamrks={stateUpdateBookamrks} />
            <LoadBookmark stateUpdateBookamrks={stateUpdateBookamrks} />
          </div>
        </div>
      </div>
      <Bookmarks
        stateUpdateBookamrks={stateUpdateBookamrks}
        styleNumber={styleNumber}
      />
    </div>
  );
};

export { Main };