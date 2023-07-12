import React, { useState } from "react";

import css from "./BaseSettings.module.sass";
import { IoMdSettings } from "react-icons/io";
import { AiOutlineCloseCircle } from 'react-icons/ai';

import { ThemeParams } from "../../../features";
import { ThemeSelect } from "../../../entities";
import { LocalStorage } from "../../../shared/model";
import { BaseButton, BaseToggleRadio } from "../../../shared/ui";

const BaseSettings = (props) => {
  const {
    enableSelectGroup,
    enableGroups,
    enableSelectTags,
    enableTags,
    enableSelectBg,
    enableBg
  } = props;

  const storageTheme = LocalStorage.getStore("themeNumber", 1);

  const [numberTheme, setTheme] = useState(storageTheme);

  const [themeModal, setModalActive] = useState(false);

  const handlerClickSettings = () => {
    setModalActive(!themeModal);
  }

  const handlerClickClose = () => {
    setModalActive(false)
  }

  return (
    <div className={css.settings}>
      <BaseButton styleNameList={["transparentStyle", "baseSettings"]} callBack={handlerClickSettings}><IoMdSettings /></BaseButton>
      {
        themeModal && (
          <>
            <div className={css.modalBg}
              onClick={handlerClickClose}></div>
            <div className={css.modal}>
              <div className={css.close} onClick={handlerClickClose} >
                <AiOutlineCloseCircle />
              </div>
              <div className={css["enable-wrap"]}>
                <div className={css["groups-enable"]}>
                  <h2>Группы</h2>
                  <BaseToggleRadio onClickChange={enableSelectGroup} defaultChecked={enableGroups} />
                </div>
                <div className={css["tags-enable"]}>
                  <h2>Тэги</h2>
                  <BaseToggleRadio onClickChange={enableSelectTags} defaultChecked={enableTags} />
                </div>
                <div className={css["bg-enable"]}>
                  <h2>Фон</h2>
                  <BaseToggleRadio onClickChange={enableSelectBg} defaultChecked={enableBg} />
                </div>
              </div>
              <ThemeSelect setTheme={setTheme} />
            </div>
          </>
        )
      }
      <ThemeParams thisNumberTheme={numberTheme} />
    </div >
  );
}

export { BaseSettings };