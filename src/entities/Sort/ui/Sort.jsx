import React, { useState } from "react";

import sass from "./Sort.module.sass"
import { TbArrowsTransferDown } from 'react-icons/tb';
import { FaSortAlphaDown, FaSortAlphaUpAlt } from 'react-icons/fa';

import { BaseButton } from "../../../shared/ui";
import { getStore, setStore, getObject, getJSON } from "../../../shared/model";

const sortListDefault = [
  { text: "Заголовок", value: "title", sortType: true },
  { text: "Описание", value: "description", sortType: true },
  { text: "Тэги", value: "tags", sortType: true },
  { text: "Папки", value: "group", sortType: true },
]

const ACTIVE_NUM_DEFAULT = 0;

const Sort = ({ onAcept = () => { } }) => {

  const [modalActive, setModalActive] = useState(false);

  const [sortList, setSortList] = useState(getObject(getStore("sortList")) || sortListDefault);

  const [activeNum, setActiveNum] = useState(Number(getStore("activeNum")) || ACTIVE_NUM_DEFAULT);

  const getNewList = (prevSortList) => {
    const newList = [...prevSortList];
    return newList;
  }

  const newList = getNewList(sortList);

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
                      onClick={(e) => {
                        if (activeNum !== i) {
                          setActiveNum(i);
                          setStore("activeNum", i);
                          setStore("sortList", getJSON(newList));
                        }
                        else {
                          newList[i] = { ...newList[i], sortType: !(newList[i].sortType) }
                          setSortList(() => newList)
                          setStore("sortList", getJSON(newList));
                        }

                        onAcept(newList[i]);
                      }}
                    >
                      {item.text}
                      <BaseButton
                        styleNameList={["transparentStyle", "noHoverStyle"]}
                        callBack={(e) => {
                          e.stopPropagation();
                          newList[i] = { ...newList[i], sortType: !(newList[i].sortType) }
                          setSortList(() => newList)
                          setActiveNum(i);
                          setStore("activeNum", i);
                          setStore("sortList", getJSON(newList));
                          onAcept(newList[i]);
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