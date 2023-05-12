import React, { useState } from "react";

import sass from "./SelectStyleBookmark.module.sass";
import { HiOutlineViewGrid } from 'react-icons/hi';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import { BaseButton } from "../../../shared/ui";

const SelectStyleBookmark = ({ setStyleNumber }) => {
  const [themeModal, setModalActive] = useState(false);

  const onClick = () => {
    setModalActive(!themeModal);
  }

  return (
    <div className={sass.main}>
      <BaseButton text="Вид" btnStyle="transparent" callBack={onClick}><HiOutlineViewGrid /></BaseButton>
      {
        themeModal && (
          <>
            <div className={sass.modalBg} onClick={() => setModalActive(false)}></div>
            <div className={sass.modal}>
              <div className={sass.close} onClick={() => { setModalActive(false) }} >
                <AiOutlineCloseCircle />
              </div>
              <ul className={sass.listBookmarks}>

                <li className={sass.bookmarks} onClick={() => setStyleNumber(1)}>
                  <div className={sass.imgPreview}></div>
                  <div className={sass.title}></div>
                  <div className={sass.description}></div>
                  <div className={sass.tagsWrap}>
                    <div className={sass.tags}></div>
                    <div className={sass.tags}></div>
                  </div>
                </li>

                <li className={sass.bookmarks} onClick={() => setStyleNumber(2)}>
                  <div className={sass.imgPreview}></div>
                  <div className={sass.title}></div>
                  <div className={sass.description}></div>
                </li>

                <li className={sass.bookmarks} onClick={() => setStyleNumber(3)}>
                  <div className={sass.imgPreview}></div>
                  <div className={sass.title}></div>
                  <div className={sass.tagsWrap}>
                    <div className={sass.tags}></div>
                    <div className={sass.tags}></div>
                  </div>
                </li>

                <li className={sass.bookmarks} onClick={() => setStyleNumber(4)}>
                  <div className={sass.imgPreview}></div>
                  <div className={sass.title}></div>
                </li>

                <li className={sass.bookmarks} onClick={() => setStyleNumber(5)}>
                  <div className={sass.imgPreview}></div>
                  <div className={sass.tagsWrap}>
                    <div className={sass.tags}></div>
                    <div className={sass.tags}></div>
                  </div>
                </li>

                <li className={sass.bookmarks} onClick={() => setStyleNumber(6)}>
                  <div className={sass.imgPreview}></div>
                </li>

                <li className={sass.bookmarks} onClick={() => setStyleNumber(7)}>
                  <div className={sass.title}></div>
                  <div className={sass.description}></div>
                  <div className={sass.tagsWrap}>
                    <div className={sass.tags}></div>
                    <div className={sass.tags}></div>
                  </div>
                </li>

                <li className={sass.bookmarks} onClick={() => setStyleNumber(8)}>
                  <div className={sass.title}></div>
                  <div className={sass.description}></div>
                </li>

                <li className={sass.bookmarks} onClick={() => setStyleNumber(9)}>
                  <div className={sass.title}></div>
                  <div className={sass.tagsWrap}>
                    <div className={sass.tags}></div>
                    <div className={sass.tags}></div>
                  </div>
                </li>

                <li className={sass.bookmarks} onClick={() => setStyleNumber(10)}>
                  <div className={sass.title}></div>
                </li>

                <li className={sass.bookmarks} onClick={() => setStyleNumber(11)}>
                  <div className={sass.imgPreview}></div>
                  <div className={sass.description}></div>
                  <div className={sass.tagsWrap}>
                    <div className={sass.tags}></div>
                    <div className={sass.tags}></div>
                  </div>
                </li>

                <li className={sass.bookmarks} onClick={() => setStyleNumber(12)}>
                  <div className={sass.description}></div>
                  <div className={sass.tagsWrap}>
                    <div className={sass.tags}></div>
                    <div className={sass.tags}></div>
                  </div>
                </li>

                <li className={sass.bookmarks} onClick={() => setStyleNumber(13)}>
                  <div className={sass.description}></div>
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