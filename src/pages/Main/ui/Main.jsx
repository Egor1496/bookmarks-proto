import React, { useContext, useState } from "react";
import sass from "./Main.module.sass"

import { BookmarksContext } from "../../../processes/model/context";
import { Bookmarks, uploadBookmarks } from "../../../widgets";
import { SelectStyleBookmark, GetFile, AddBookmark, LoadBookmark } from "../../../features";
import { Sort } from "../../../entities";
import { getStore, setStore } from "../../../shared/model";

const Main = () => {

  const [
    bookmarks,
    setBookmarks,
    groupName,
    updateFilter,
    onClickTags
  ] = useContext(BookmarksContext);

  const defStyleNumber = getStore("styleNumber", 1)

  const [styleNumber, setStyleNumber] = useState(defStyleNumber);

  const onClickStyleBookmarks = (number) => {
    setStore("styleNumber", number);
    setStyleNumber(number);
  }

  return (
    <div className={sass.main}>
      <div className={sass.mainWrap}>
        <div className={sass.inner}>
          <div className={sass.countBookmarks}>{groupName || "Всего"} - {bookmarks.length}</div>
          <div className={sass.buttonWrap}>
            <Sort />
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
              setBookmarks={setBookmarks}
              uploadBookmarks={uploadBookmarks}
              updateFilter={updateFilter}
            />
            <LoadBookmark
              uploadBookmarks={uploadBookmarks}
              setBookmarks={setBookmarks}
              updateFilter={updateFilter}
            />
          </div>
        </div>
      </div>
      <Bookmarks
        styleNumber={styleNumber}
        bookmarks={bookmarks}
        setBookmarks={setBookmarks}
        updateFilter={updateFilter}
        onClickTags={onClickTags}
      />
    </div>
  );
};

export { Main };