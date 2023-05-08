import React, { useState } from "react";

import sass from "./BaseSettings.module.sass";
import { IoMdSettings } from "react-icons/io";

import { BaseButton } from "../../../shared/ui";
import { getStore } from "../../../shared/model";
import { ThemeSelect } from "../../../entities";
import { ThemeParams } from "../../../features";

const BaseSettings = () => {
  const storageTheme = localStorage.getItem("themeNumber") || 1;

  const [numberTheme, setTheme] = useState(storageTheme);
  const [themeActive, setThemeActive] = useState(false);

  const onClick = () => {
    setThemeActive(!themeActive);
  }

  return (
    <div className={sass.settings}>
      <BaseButton sizeStyle="big" btnStyle="transparent" callBack={onClick}><IoMdSettings /></BaseButton>
      {
        themeActive && (
          <>
            <div className={sass.modalBg}
              onClick={() => setThemeActive(false)}></div>
            <div className={sass.modal}>
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