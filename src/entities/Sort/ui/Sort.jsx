import React, { useState, useContext } from "react";

import sass from "./Sort.module.sass"
import { TbArrowsTransferDown } from 'react-icons/tb';
import { FaSortAlphaDown, FaSortAlphaUpAlt } from 'react-icons/fa';

import { BookmarksContext } from "../../../processes/model/context";

import { BaseButton } from "../../../shared/ui";
import { LocalStorage, JsonHelper } from "../../../shared/model";

const sortListDefault = [
  { text: "Заголовок", value: "title", sortType: true },
  { text: "Описание", value: "description", sortType: true },
  { text: "Тэги", value: "tags", sortType: true },
  { text: "Папки", value: "group", sortType: true },
]

const ACTIVE_NUM_DEFAULT = 0;

const Sort = () => {

  const [modalActive, setModalActive] = useState(false);

  const [sortList, setSortList] = useState(JsonHelper.getObject(LocalStorage.getStore("sortList")) || sortListDefault);

  const [activeNum, setActiveNum] = useState(Number(LocalStorage.getStore("activeNum")) || ACTIVE_NUM_DEFAULT);

  const {
    bookmarksArray,
    filter,
    setBookmarks,
    setSort,
  } = useContext(BookmarksContext);

  const getNewList = (prevSortList) => {
    const newList = [...prevSortList];
    return newList;
  }

  const newList = getNewList(sortList);

  const onSortSelect = (newSort) => {
    setSort(newSort);
    setBookmarks(bookmarksArray.getBookmarks(filter, newSort))
    LocalStorage.setStore("sort", JsonHelper.getJSON(newSort));
  };

  const handlerClickLi = (i) => {
    if (activeNum !== i) {
      setActiveNum(i);
      LocalStorage.setStore("activeNum", i);
      LocalStorage.setStore("sortList", JsonHelper.getJSON(newList));
    }
    else {
      newList[i] = { ...newList[i], sortType: !(newList[i].sortType) }
      setSortList(() => newList)
      LocalStorage.setStore("sortList", JsonHelper.getJSON(newList));
    }
    onSortSelect(newList[i]);
  }

  const handlerCallback = (i) => {
    newList[i] = { ...newList[i], sortType: !(newList[i].sortType) }
    setSortList(() => newList)
    setActiveNum(i);
    LocalStorage.setStore("activeNum", i);
    LocalStorage.setStore("sortList", JsonHelper.getJSON(newList));
    onSortSelect(newList[i]);
  }

  return (
    <div className={sass.main}>
      <BaseButton
        text="Сортировка"
        styleNameList={["transparentStyle", modalActive && "buttonActive"]}
        callBack={() => setModalActive(true)}
      >
        <TbArrowsTransferDown />
      </BaseButton>
      {
        modalActive && (
          <>
            <ul className={sass.selectSort}>
              {
                sortList.map((item, i) => {
                  return (
                    <li
                      key={item.text}
                      className={`${sass.sortItem} ${activeNum === i && sass.sortItemActive}`}
                      onClick={(e) => handlerClickLi(i)}
                    >
                      {item.text}
                      <BaseButton
                        styleNameList={["transparentStyle", "noHoverStyle"]}
                        callBack={(e) => {
                          e.stopPropagation();
                          handlerCallback(i);
                        }}
                      >
                        {item.sortType ? <FaSortAlphaDown /> : <FaSortAlphaUpAlt />}
                      </BaseButton>
                    </li>
                  )
                })
              }
            </ul >
            <div className={sass.modalBg} onClick={() => setModalActive(false)} />
          </>
        )
      }
    </div >
  );
}

export { Sort };