import React, { useState } from "react";
import sass from "./Bookmarks.module.sass";

import { deleteBookmark, editBookmark } from "../../../widgets";
import { Bookmark } from "../../../features";
import { BookmarkModal, DialogModal } from "../../../entities";
import { Notification } from "../../../shared/ui";
import { sendMesageNotification } from "../../../shared/model";

const Bookmarks = ({ bookmarks, setBookmarks, updateFilter, styleNumber, onClickTags }) => {

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
          deleteBookmark(form.id, setBookmarks);
          updateFilter();
          sendMesageNotification({ text: "Ссылка удалена!", alarm: true }, setNotification);
        }}
      />
      <BookmarkModal
        modalTitle={`Редактировать "${form.title}"`}
        modalActive={editModalActive}
        modalSetActive={editModalSetActive}
        onАccept={(newBookmark) => {
          editBookmark(form.id, newBookmark, setBookmarks);
          sendMesageNotification({ text: "Ссылка редактирована!" }, setNotification);
        }}
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