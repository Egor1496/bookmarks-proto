import React, { useContext, useState } from "react";
import sass from "./AddBookmark.module.sass"

import { AiOutlineAppstoreAdd } from 'react-icons/ai';

import { Store } from "../../../processes/model/context";
import { BookmarkModal } from "../../../entities";
import { BaseButton, Notification } from "../../../shared/ui";
import { sendMesageNotification } from "../../../shared/model";

const AddBookmark = () => {

  const {
    bookmarksArray,
    bookmarks,
    tags,
    groups,
    filter,
    sort,
    setBookmarks,
    setTagCloud,
    setGroupLinks,
  } = useContext(Store);

  const [modalActive, modalSetActive] = useState(false);

  const [bookmarkState, setBookmarkState] = useState({
    link: "https://www.youtube.com",
    title: "",
    description: "",
    tags: "",
    group: ""
  });

  const [notification, setNotification] = useState();

  const updateFilter = () => {
    setTagCloud(tags.getTags(bookmarks));
    setGroupLinks(groups.getGroups());
  }

  const onAddBookmarks = () => {
    setBookmarks(bookmarksArray.getBookmarks(filter, sort));
  }

  return (
    <div className={sass.main}>
      <Notification state={notification} setState={setNotification} />
      <BookmarkModal
        onАccept={(newBookmark) => {
          bookmarksArray.uploadBookmarks({ ...newBookmark }, onAddBookmarks);
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