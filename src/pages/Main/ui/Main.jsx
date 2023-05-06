import React, { useContext } from "react";
import sass from "./Main.module.sass"

import { Sort } from "../../../entities";
import { SelectStyleBookmark, Filters, AddBookmark, LoadBookmark } from "../../../features";
import { Bookmarks, uploadBookmarks } from "../../../widgets";
import { BookmarksContext } from "../../../processes/model/context";

const Main = () => {

  const [
    bookmarks,
    setBookmarks,
    groupName,
    updateGroupsAndTags
  ] = useContext(BookmarksContext);

  return (
    <div className={sass.main}>
      <div className={sass["inner"]}>
        <div className={sass.countBookmarks}>{groupName || "Всего"} - {bookmarks.length}</div>
        <SelectStyleBookmark />
      </div>
      <div className={sass["inner"]}>
        <div className={sass["sort-wrap"]}>
          <Sort />
          <Filters />
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
        bookmarks={bookmarks}
        setBookmarks={setBookmarks}
        updateGroupsAndTags={updateGroupsAndTags}
      />
    </div>
  );
};

export { Main };