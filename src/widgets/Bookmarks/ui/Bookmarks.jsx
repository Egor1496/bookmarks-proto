import React, { useState } from "react";
import sass from "./Bookmarks.module.sass";

import { deleteBookmark, editBookmark } from "../../../widgets";
import { Bookmark } from "../../../features";
import { BookmarkModal, DialogModal } from "../../../entities";

const Bookmarks = ({ bookmarks, setBookmarks, updateGroupsAndTags, styleNumber, onClickTags }) => {

  const [deleteModalActive, setDeleteModalActive] = useState(false);
  const [editModalActive, editModalSetActive] = useState(false);

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
      <DialogModal
        modalTitle={`Удалить "${form.title}" ?`}
        textAccept="Удалить"
        textСancele="Отмена"
        modalActive={deleteModalActive}
        modalSetActive={setDeleteModalActive}
        onАccept={() => {
          deleteBookmark(form.id, setBookmarks);
          updateGroupsAndTags();
        }}
      />
      <BookmarkModal
        modalTitle={`Редактировать "${form.title}"`}
        modalActive={editModalActive}
        modalSetActive={editModalSetActive}
        onАccept={(newBookmark) => { editBookmark(form.id, newBookmark, setBookmarks); }}
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