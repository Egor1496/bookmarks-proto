import React, { useContext, useState } from "react";
import sass from "./LoadBookmark.module.sass"


import { AiFillFileText } from 'react-icons/ai';
import { FaCloudUploadAlt } from 'react-icons/fa';

import { Store } from "../../../processes/model/context";
import { BaseModal, BaseButton, Notification } from "../../../shared/ui";
import { FillBookmark, JsonHelper, sendMesageNotification, LoadFile } from "../../../shared/model";

const LoadBookmark = () => {

  const {
    bookmarksArray,
    tags,
    groups,
    filter,
    sort,
    setBookmarks,
    setTagCloud,
    setGroupLinks,
  } = useContext(Store);

  const [modalActive, modalSetActive] = useState(false);

  const [notification, setNotification] = useState();

  const loadObgect = (bookmarksList) => {
    const obgBookmarks = JsonHelper.getObject(bookmarksList).bookmarks;
    obgBookmarks.forEach(el => {
      el.title = FillBookmark.getTitle(el.title, el.link);
      bookmarksArray.uploadBookmarks({ ...el });
    });
    const newBookmarksList = bookmarksArray.getBookmarks(filter, sort);
    setBookmarks(newBookmarksList);
    tags.updateState(setTagCloud, tags.getTags(newBookmarksList));
    groups.updateState(setGroupLinks, groups.getGroups(newBookmarksList));
    sendMesageNotification(
      { text: "Загруженно ссылок - " + obgBookmarks.length + "шт." },
      setNotification
    );
  }

  return (
    <div className={sass.main}>
      <Notification state={notification} setState={setNotification} />
      <BaseModal
        active={modalActive}
        setActive={modalSetActive}
      >
        <div className={sass.addBookFrom}>
          <h3>Загрузить фаил</h3>
          <label>
            <div
              className={sass.dropZone}
              onDrop={(e) => { LoadFile.onDrop(e, loadObgect); modalSetActive(false); }}
              onDragOver={(e) => e.preventDefault()}>
              <input
                className={sass.inputFile}
                type="file"
                onChange={(e) => { LoadFile.read(e.target, loadObgect); modalSetActive(false); }}
              />
              <div className={sass.iconUplad}><FaCloudUploadAlt /></div>
              <span className={sass.textUpload}><span>Выберите фаил</span>   или перетащите его сюда</span>
            </div>
          </label>
        </div>
      </BaseModal >
      <BaseButton
        text="Загрузить"
        callBack={() => { modalSetActive(true); }} >
        <AiFillFileText />
      </BaseButton>
    </div >
  );
}

export { LoadBookmark };