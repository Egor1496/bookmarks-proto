import React, { useState } from "react";

import sass from "./Bookmarks.module.sass";

import { Bookmark } from "../../../features";
import { BookmarkModal, DialogModal } from "../../../entities";
import { Notification } from "../../../shared/ui";
import { sendMesageNotification } from "../../../shared/model";

const Bookmarks = (props) => {

  const {
    bookmarks,
    bookmarksArray,
    updateFilter,
    styleNumber,
    onClickTags,
    setBookmarks,
    filter,
    sort
  } = props;

  const [deleteModalActive, setDeleteModalActive] = useState(false);
  const [editModalActive, editModalSetActive] = useState(false);
  const [notification, setNotification] = useState();

  const [form, setForm] = useState({});

  const onDeleteBookmark = (elem) => {
    setForm({ ...elem });
    setDeleteModalActive(true);
  }

  const onEditBookmark = (elem) => {
    setForm({ ...elem });
    editModalSetActive(true);
  }

  const onAddBookmarks = () => {
    setBookmarks(bookmarksArray.getBookmarks(filter, sort));
  }

  const handlerAcceptEdit = (newBookmark) => {
    bookmarksArray.editBookmark(form.id, newBookmark, onAddBookmarks);
    // updateFilter();
    sendMesageNotification({ text: "Ссылка редактирована!" }, setNotification);
  }

  const handlerAcceptDelete = () => {
    bookmarksArray.deleteBookmark(form.id, onAddBookmarks);
    updateFilter();
    sendMesageNotification({ text: "Ссылка удалена!", alarm: true }, setNotification);
  }

  return (
    <>
      <Notification state={notification} setState={setNotification} />
      <DialogModal
        modalTitle={`Удалить "${form.title}" ?`}
        textAccept="Удалить"
        textСancele="Отмена"
        modalActive={deleteModalActive}
        modalSetActive={setDeleteModalActive}
        onАccept={() => {
          handlerAcceptDelete()
        }}
      />
      <BookmarkModal
        modalTitle={`Редактировать "${form.title}"`}
        modalActive={editModalActive}
        modalSetActive={editModalSetActive}
        onАccept={(newBookmark) => handlerAcceptEdit(newBookmark)}
        state={form}
        setState={setForm}
      />
      <div className={sass["bookmarks-wrap"]}>
        {
          bookmarks.map((elem) => {
            return <Bookmark
              key={elem.id}
              bookmark={elem}
              styleNumber={styleNumber}
              onDeleteBookmark={() => { onDeleteBookmark(elem); }}
              onEditBookmark={() => { onEditBookmark(elem); }}
              onClickTags={onClickTags}
            />
          })
        }
      </div>
    </>
  );
}

export { Bookmarks };