import React, { useContext, useState } from "react";

import sass from "./Main.module.sass"

import { Store } from "../../../processes/model/context";
import { Bookmarks } from "../../../widgets";
import { SelectStyleBookmark, GetFile, AddBookmark, LoadBookmark } from "../../../features";
import { Sort } from "../../../entities";
import { LocalStorage } from "../../../shared/model";

const Main = () => {

  const {
    bookmarks,
    filter,
  } = useContext(Store);

  const defStyleNumber = LocalStorage.getStore("styleNumber", 1);

  const [styleNumber, setStyleNumber] = useState(defStyleNumber);

  return (
    <div className={sass.main}>
      <div className={sass.mainWrap}>
        <div className={sass.inner}>
          <div className={sass.countBookmarks}>{filter[0] || "Всего"} - {bookmarks.length}</div>
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
            <AddBookmark />
            <LoadBookmark />
          </div>
        </div>
      </div>
      <Bookmarks styleNumber={styleNumber} />
    </div>
  );
};

export { Main };