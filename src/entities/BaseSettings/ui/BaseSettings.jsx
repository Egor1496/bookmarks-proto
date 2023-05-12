import React, { useState } from "react";

import sass from "./BaseSettings.module.sass";
import { IoMdSettings } from "react-icons/io";
import { AiOutlineCloseCircle } from 'react-icons/ai';

import { ThemeParams } from "../../../features";
import { ThemeSelect } from "../../../entities";
import { getStore } from "../../../shared/model";
import { BaseButton } from "../../../shared/ui";

const BaseSettings = () => {
  const storageTheme = getStore("themeNumber", 1);

  const [numberTheme, setTheme] = useState(storageTheme);

  const [themeModal, setModalActive] = useState(false);

  const onClick = () => {
    setModalActive(!themeModal);
  }

  return (
    <div className={sass.settings}>
      <BaseButton sizeStyle="big" btnStyle="transparent" callBack={onClick}><IoMdSettings /></BaseButton>
      {
        themeModal && (
          <>
            <div className={sass.modalBg}
              onClick={() => setModalActive(false)}></div>
            <div className={sass.modal}>
              <div className={sass.close} onClick={() => { setModalActive(false) }} >
                <AiOutlineCloseCircle />
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