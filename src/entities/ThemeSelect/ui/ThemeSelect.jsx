import React from "react";

import css from "./ThemeSelect.module.sass"

import { BaseButton } from "../../../shared/ui";
import { setStore } from "../../../shared/model";
import { THEME_COLORS } from "../../../shared/model";

const ThemeSelect = ({ setTheme }) => {
  return (
    <div className={css.main}>
      {
        [...Array(29)].map((el, i) => {
          return <BaseButton
            key={i}
            callBack={() => { setTheme(i); setStore("themeNumber", i) }}
            css={{ "backgroundColor": THEME_COLORS[i][2], "minWidth": "50px", "minHeight": "50px" }}
          />
        }
        )
      }
    </div>
  );
}

export { ThemeSelect };