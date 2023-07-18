import React, { useContext, useState } from "react";

import sass from "./Main.module.sass"

import { BookmarksContext } from "../../../processes/model/context";
import { Bookmarks } from "../../../widgets";
import { SelectStyleBookmark, GetFile, AddBookmark, LoadBookmark } from "../../../features";
import { Sort } from "../../../entities";
import { LocalStorage } from "../../../shared/model";

const Main = () => {

  const [
    bookmarks,
    groupName,
    updateFilter,
    onClickTags,
    onSortSelect,
    bookmarksArray,
    setBookmarks,
    filter,
    sort
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
              bookmarksArray={bookmarksArray}
              updateFilter={updateFilter}
              setBookmarks={setBookmarks}
              filter={filter}
              sort={sort}
            />
            <LoadBookmark
              bookmarksArray={bookmarksArray}
              updateFilter={updateFilter}
              setBookmarks={setBookmarks}
              filter={filter}
              sort={sort}
            />
          </div>
        </div>
      </div>
      <Bookmarks
        styleNumber={styleNumber}
        bookmarksArray={bookmarksArray}
        bookmarks={bookmarks}
        updateFilter={updateFilter}
        setBookmarks={setBookmarks}
        filter={filter}
        sort={sort}
        onClickTags={onClickTags}
      />
    </div>
  );
};

export { Main };