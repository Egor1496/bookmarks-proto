import React from "react";

import css from "./ThemeSelect.module.sass"

import { BaseButton, BaseToggleBox, BaseToggleRadio } from "../../../shared/ui";
import { setStore } from "../../../shared/model";
import { THEME_COLORS } from "../../../shared/model";

const ThemeSelect = ({ setTheme }) => {
  return (
    <div className={css.main}>
      <h2 className={css["theme-title"]}>Выбрать тему</h2>
      <div className={css["theme-wrap"]}>
        {
          [...Array(THEME_COLORS.length)].map((el, i) => {
            return <BaseButton
              key={i}
              callBack={() => { setTheme(i); setStore("themeNumber", i) }}
              css={{ "backgroundColor": THEME_COLORS[i][2], "minWidth": "50px", "minHeight": "50px" }}
            />
          }
          )
        }
      </div>
    </div>
  );
}

export { ThemeSelect };