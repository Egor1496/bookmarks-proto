import React, { useState } from "react";
import sass from "./AddBookmark.module.sass"

import { AiOutlineAppstoreAdd } from 'react-icons/ai';

import { BookmarkModal } from "../../../entities";
import { BaseButton, Notification } from "../../../shared/ui";
import { sendMesageNotification } from "../../../shared/model";

const AddBookmark = (props) => {

  const {
    uploadBookmarks,
    onAddBookmarks,
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

  const [notification, setNotification] = useState();

  return (
    <div className={sass.main}>
      <Notification state={notification} setState={setNotification} />
      <BookmarkModal
        onАccept={(newBookmark) => {
          uploadBookmarks({ ...newBookmark }, onAddBookmarks);
          updateFilter();
          sendMesageNotification({ text: "Добавлена ссылка!" }, setNotification);
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