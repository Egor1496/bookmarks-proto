import React, { useContext, useState } from "react";
import sass from "./Main.module.sass"

import { Sort } from "../../../entities";
import { SelectStyleBookmark, GetFile, AddBookmark, LoadBookmark } from "../../../features";
import { Bookmarks, uploadBookmarks } from "../../../widgets";
import { BookmarksContext } from "../../../processes/model/context";

const Main = () => {

  const [
    bookmarks,
    setBookmarks,
    groupName,
    updateGroupsAndTags,
  ] = useContext(BookmarksContext);

  const [styleNumber, setStyleNumber] = useState(1);

  return (
    <div className={sass.main}>
      <div className={sass.inner}>
        <div className={sass.countBookmarks}>{groupName || "Всего"} - {bookmarks.length}</div>
        <div className={sass.buttonWrap}>
          <Sort />
          <SelectStyleBookmark setStyleNumber={setStyleNumber} />
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
            updateGroupsAndTags={updateGroupsAndTags}
          />
          <LoadBookmark
            uploadBookmarks={uploadBookmarks}
            setBookmarks={setBookmarks}
            updateGroupsAndTags={updateGroupsAndTags}
          />
        </div>
      </div>
      <Bookmarks
        styleNumber={styleNumber}
        bookmarks={bookmarks}
        setBookmarks={setBookmarks}
        updateGroupsAndTags={updateGroupsAndTags}
      />
    </div>
  );
};

export { Main };