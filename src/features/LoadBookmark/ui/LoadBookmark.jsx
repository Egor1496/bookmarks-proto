import React, { useState } from "react";
import sass from "./LoadBookmark.module.sass"


import { AiFillFileText } from 'react-icons/ai';
import { FaCloudUploadAlt } from 'react-icons/fa';

import { BaseModal, BaseButton, Notification } from "../../../shared/ui";
import { FillBookmark, JsonHelper, sendMesageNotification } from "../../../shared/model";

const LoadBookmark = (props) => {

  const {
    bookmarksArray,
    updateFilter,
    setBookmarks,
    filter,
    sort
  } = props;

  const [modalActive, modalSetActive] = useState(false);

  const [notification, setNotification] = useState();

  const onAddBookmarks = () => {
    setBookmarks(bookmarksArray.getBookmarks(filter, sort));
  }

  const loadObgectBookmarks = (bookmarks) => {
    const obgBookmarks = JsonHelper.getObject(bookmarks).bookmarks;
    obgBookmarks.forEach(el => {
      el.title = FillBookmark.getTitle(el.title, el.link);
      bookmarksArray.uploadBookmarks({ ...el }, onAddBookmarks);
    });
    updateFilter();
    sendMesageNotification(
      { text: "Загруженно ссылок - " + obgBookmarks.length + "шт." },
      setNotification
    );
  }

  const dropHandler = (e) => {
    e.preventDefault();

    if (e.dataTransfer.items) {
      [...e.dataTransfer.items].forEach((item) => {
        if (item.kind === "file") {
          const file = item.getAsFile();
          const reader = new FileReader();
          reader.readAsText(file);
          reader.onload = () => {
            loadObgectBookmarks(reader.result);
          };
          reader.onerror = () => {
            console.log(reader.error);
          };
        }
      });
    }
  }

  const readFile = (input) => {
    const file = input.files[0];
    const reader = new FileReader();

    reader.readAsText(file);

    reader.onload = () => {
      loadObgectBookmarks(reader.result);
    };

    reader.onerror = () => {
      console.log(reader.error);
    };
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
              onDrop={(e) => { dropHandler(e); modalSetActive(false); }}
              onDragOver={(e) => e.preventDefault()}>
              <input
                className={sass.inputFile}
                type="file"
                onChange={(e) => { readFile(e.target); modalSetActive(false); }}
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