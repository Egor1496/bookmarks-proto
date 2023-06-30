import React, { useState } from "react";

import css from "./BaseSettings.module.sass";
import { IoMdSettings } from "react-icons/io";
import { AiOutlineCloseCircle } from 'react-icons/ai';

import { ThemeParams } from "../../../features";
import { ThemeSelect } from "../../../entities";
import { getStore } from "../../../shared/model";
import { BaseButton, BaseToggleRadio } from "../../../shared/ui";

const BaseSettings = ({ enableSelectGroup, enableGroups, enableSelectTags, enableTags }) => {
  const storageTheme = getStore("themeNumber", 1);

  const [numberTheme, setTheme] = useState(storageTheme);

  const [themeModal, setModalActive] = useState(false);

  const onClick = () => {
    setModalActive(!themeModal);
  }

  return (
    <div className={css.settings}>
      <BaseButton styleNameList={["transparentStyle", "baseSettings"]} callBack={onClick}><IoMdSettings /></BaseButton>
      {
        themeModal && (
          <>
            <div className={css.modalBg}
              onClick={() => setModalActive(false)}></div>
            <div className={css.modal}>
              <div className={css.close} onClick={() => { setModalActive(false) }} >
                <AiOutlineCloseCircle />
              </div>
              <div className={css["enable-wrap"]}>
                <div className={css["groups-enable"]}>
                  <h2>Показать группы</h2>
                  <BaseToggleRadio onClickChange={enableSelectGroup} defaultChecked={enableGroups} />
                </div>
                <div className={css["tags-enable"]}>
                  <h2>Показать тэги</h2>
                  <BaseToggleRadio onClickChange={enableSelectTags} defaultChecked={enableTags} />
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