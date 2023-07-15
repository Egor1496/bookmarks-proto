import React, { useContext, useState } from "react";

import sass from "./Main.module.sass"

import { BookmarksContext } from "../../../processes/model/context";
import { Bookmarks, bookmarksArray } from "../../../widgets";
import { SelectStyleBookmark, GetFile, AddBookmark, LoadBookmark } from "../../../features";
import { Sort } from "../../../entities";
import { LocalStorage } from "../../../shared/model";

const Main = () => {

  const [
    bookmarks,
    onAddBookmarks,
    groupName,
    updateFilter,
    onClickTags,
    onSortSelect,
  ] = useContext(BookmarksContext);

  const defStyleNumber = LocalStorage.getStore("styleNumber", 1)

  const [styleNumber, setStyleNumber] = useState(defStyleNumber);

  const onClickStyleBookmarks = (number) => {
    LocalStorage.setStore("styleNumber", number);
    setStyleNumber(number);
  }

  return (
    <div className={sass.main}>
      <div className={sass.mainWrap}>
        <div className={sass.inner}>
          <div className={sass.countBookmarks}>{groupName || "Всего"} - {bookmarks.length}</div>
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
            <AddBookmark
              bookmarks={bookmarks}
              onAddBookmarks={onAddBookmarks}
              uploadBookmarks={bookmarksArray.uploadBookmarks}
              updateFilter={updateFilter}
            />
            <LoadBookmark
              uploadBookmarks={bookmarksArray.uploadBookmarks}
              onAddBookmarks={onAddBookmarks}
              updateFilter={updateFilter}
            />
          </div>
        </div>
      </div>
      <Bookmarks
        styleNumber={styleNumber}
        bookmarks={bookmarks}
        onAddBookmarks={onAddBookmarks}
        updateFilter={updateFilter}
        onClickTags={onClickTags}
      />
    </div>
  );
};

export { Main };