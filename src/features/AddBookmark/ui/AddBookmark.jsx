import React, { useState } from "react";
import sass from "./AddBookmark.module.sass"

import { AiOutlineAppstoreAdd } from 'react-icons/ai';

import { BookmarkModal } from "../../../entities";
import { BaseButton, Notification } from "../../../shared/ui";

const AddBookmark = (props) => {

  const {
    uploadBookmarks,
    setBookmarks,
    updateFilter
  } = props;

  const [modalActive, modalSetActive] = useState(false);

  const [bookmarkState, setBookmarkState] = useState({
    link: "https://www.youtube.com",
    title: "",
    description: "",
    tags: "",
    group: ""
  });

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
      <BookmarkModal
        onАccept={(newBookmark) => {
          uploadBookmarks({ ...newBookmark }, setBookmarks);
          updateFilter();
          sendMessage("Добавлена ссылка!");
        }}
        modalActive={modalActive}
        modalSetActive={modalSetActive}
        modalTitle="Создать закладку"
        state={bookmarkState}
        setState={setBookmarkState}
      />
      <BaseButton
        text="Создать"
        callBack={() => { modalSetActive(true) }}
      >
        <AiOutlineAppstoreAdd />
      </BaseButton>
    </div >
  );
}

export { AddBookmark };