import React from "react";

import sass from "./ThemeSelect.module.sass"

import { BaseButton } from "../../../shared/ui";
import { LocalStorage } from "../../../shared/model";
import { BASE_PARAMS } from "../../../shared/model";

const ThemeSelect = ({ setTheme }) => {
  return (
    <div className={sass.main}>
      <h2 className={sass["theme-title"]}>Выбрать тему</h2>
      <div className={sass["theme-wrap"]}>
        {
          [...Array(BASE_PARAMS.length)].map((el, i) => {
            return <BaseButton
              key={i}
              callBack={() => { setTheme(i); LocalStorage.setStore("themeNumber", i) }}
              css={{ "backgroundColor": BASE_PARAMS[i]["color1"], "minWidth": "50px", "minHeight": "50px" }}
            >
              <div className={sass["border"]} style={{ "backgroundColor": BASE_PARAMS[i]["color2"] }}></div>
            </BaseButton>
          }
          )
        }
      </div>
    </div>
  );
}

export { ThemeSelect };