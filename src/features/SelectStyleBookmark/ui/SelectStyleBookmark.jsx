import React, { useState } from "react";

import sass from "./SelectStyleBookmark.module.sass";
import { HiOutlineViewGrid } from 'react-icons/hi';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import { BaseButton } from "../../../shared/ui";
import { LocalStorage } from "../../../shared/model";

const SelectStyleBookmark = ({ setStyleNumber }) => {
  const [themeModal, setModalActive] = useState(false);

  const onClick = () => {
    setModalActive(!themeModal);
  }

  const onClickStyleBookmarks = (number) => {
    LocalStorage.setStore("styleNumber", number);
    setStyleNumber(number);
  }

  return (
    <div className={sass.main}>
      <BaseButton
        text="Вид"
        styleName="transparentStyle"
        callBack={onClick}>
        <HiOutlineViewGrid />
      </BaseButton>
      {
        themeModal && (
          <>
            <div className={sass.modalBg} onClick={() => setModalActive(false)}></div>
            <div className={sass.modal}>
              <div className={sass.close} onClick={() => { setModalActive(false) }} >
                <AiOutlineCloseCircle />
              </div>
              <ul className={sass.listBookmarks}>

                <li className={sass.bookmarks} onClick={() => onClickStyleBookmarks(1)}>
                  <div className={sass.imgPreview}></div>
                  <div className={sass.title}></div>
                  <div className={sass.description}></div>
                  <div className={sass.tagsWrap}>
                    <div className={sass.tags}></div>
                    <div className={sass.tags}></div>
                  </div>
                </li>

                <li className={sass.bookmarks} onClick={() => onClickStyleBookmarks(2)}>
                  <div className={sass.imgPreview}></div>
                  <div className={sass.title}></div>
                  <div className={sass.description}></div>
                </li>

                <li className={sass.bookmarks} onClick={() => onClickStyleBookmarks(3)}>
                  <div className={sass.imgPreview}></div>
                  <div className={sass.title}></div>
                  <div className={sass.tagsWrap}>
                    <div className={sass.tags}></div>
                    <div className={sass.tags}></div>
                  </div>
                </li>

                <li className={sass.bookmarks} onClick={() => onClickStyleBookmarks(4)}>
                  <div className={sass.imgPreview}></div>
                  <div className={sass.title}></div>
                </li>

                <li className={sass.bookmarks} onClick={() => onClickStyleBookmarks(5)}>
                  <div className={sass.imgPreview}></div>
                  <div className={sass.tagsWrap}>
                    <div className={sass.tags}></div>
                    <div className={sass.tags}></div>
                  </div>
                </li>

                <li className={sass.bookmarks} onClick={() => onClickStyleBookmarks(6)}>
                  <div className={sass.imgPreview}></div>
                </li>

                <li className={sass.bookmarks} onClick={() => onClickStyleBookmarks(7)}>
                  <div className={sass.title}></div>
                  <div className={sass.description}></div>
                  <div className={sass.tagsWrap}>
                    <div className={sass.tags}></div>
                    <div className={sass.tags}></div>
                  </div>
                </li>

                <li className={sass.bookmarks} onClick={() => onClickStyleBookmarks(8)}>
                  <div className={sass.title}></div>
                  <div className={sass.description}></div>
                </li>

                <li className={sass.bookmarks} onClick={() => onClickStyleBookmarks(9)}>
                  <div className={sass.title}></div>
                  <div className={sass.tagsWrap}>
                    <div className={sass.tags}></div>
                    <div className={sass.tags}></div>
                  </div>
                </li>

                <li className={sass.bookmarks} onClick={() => onClickStyleBookmarks(10)}>
                  <div className={sass.title}></div>
                </li>

                <li className={sass.bookmarks} onClick={() => onClickStyleBookmarks(11)}>
                  <div className={sass.imgPreview}></div>
                  <div className={sass.description}></div>
                  <div className={sass.tagsWrap}>
                    <div className={sass.tags}></div>
                    <div className={sass.tags}></div>
                  </div>
                </li>

                <li className={sass.bookmarks} onClick={() => onClickStyleBookmarks(12)}>
                  <div className={sass.description}></div>
                  <div className={sass.tagsWrap}>
                    <div className={sass.tags}></div>
                    <div className={sass.tags}></div>
                  </div>
                </li>

                <li className={sass.bookmarks} onClick={() => onClickStyleBookmarks(13)}>
                  <div className={sass.description}></div>
                </li>

                <li
                  className={`${sass["bookmarks"]} ${sass["bookmarks--transparent"]}`}
                  onClick={() => onClickStyleBookmarks(14)}
                >
                  <div className={sass.imgPreview}></div>
                </li>

                <li
                  className={`${sass["bookmarks"]} ${sass["bookmarks--transparent"]}`}
                  onClick={() => onClickStyleBookmarks(15)}
                >
                  <div className={sass.imgPreview}></div>
                  <div className={sass.tagsWrap}>
                    <div className={sass.tags}></div>
                    <div className={sass.tags}></div>
                  </div>
                </li>

                <li
                  className={`${sass["bookmarks"]} ${sass["bookmarks--transparent-radio"]}`}
                  onClick={() => onClickStyleBookmarks(16)}
                >
                  <div className={sass.imgPreview}></div>
                </li>

                <li
                  className={`${sass["bookmarks"]} ${sass["bookmarks--transparent-radio"]}`}
                  onClick={() => onClickStyleBookmarks(17)}
                >
                  <div className={sass.imgPreview}></div>
                  <div className={`${sass["title"]} ${sass["title--abs"]}`}></div>
                </li>

                <li
                  className={`${sass["bookmarks"]} ${sass["bookmarks--transparent-radio"]}`}
                  onClick={() => onClickStyleBookmarks(18)}
                >
                  <div className={sass.imgPreview}></div>
                  <div className={`${sass["description"]} ${sass["description--abs"]}`}></div>
                </li>

              </ul>
            </div>
          </>
        )
      }
    </div >
  );
}

export { SelectStyleBookmark };