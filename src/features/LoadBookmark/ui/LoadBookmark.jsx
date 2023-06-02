import React, { useState } from "react";
import sass from "./LoadBookmark.module.sass"


import { AiFillFileText } from 'react-icons/ai';
import { FaCloudUploadAlt } from 'react-icons/fa';

import { BaseModal, BaseButton, Notification } from "../../../shared/ui";
import { getTitle, getObject } from "../../../shared/model";

const LoadBookmark = (props) => {

  const {
    uploadBookmarks,
    setBookmarks,
    updateFilter
  } = props;

  const [modalActive, modalSetActive] = useState(false);

  const loadObgectBookmarks = (bookmarks) => {
    const obgBookmarks = getObject(bookmarks).bookmarks;
    obgBookmarks.forEach(el => {
      el.title = getTitle(el.title, el.link);
      uploadBookmarks({ ...el }, setBookmarks);
    });
    updateFilter();
    sendMessage("Загруженно ссылок - " + obgBookmarks.length + "шт.");
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

  const [notification, setNotification] = useState({
    isOpen: false,
    text: "Готово!",
    description: "",
    alarm: false
  });

  const sendMessage = (text, description, alarm) => {
    setNotification({
      isOpen: true,
      text,
      description,
      alarm
    });
    setTimeout(() => {
      setNotification({
        isOpen: false,
        text,
        description,
        alarm
      });
    }, 3000);
  }

  return (
    <div className={sass.main}>
      <Notification
        text={notification.text}
        description={notification.description}
        alarm={notification.alarm}
        active={notification.isOpen} />
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