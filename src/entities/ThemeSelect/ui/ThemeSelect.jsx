import React from "react";

import css from "./ThemeSelect.module.sass"

import { BaseButton } from "../../../shared/ui";
import { setStore } from "../../../shared/model";
import { BASE_PARAMS } from "../../../shared/model";

const ThemeSelect = ({ setTheme }) => {
  return (
    <div className={css.main}>
      <h2 className={css["theme-title"]}>Выбрать тему</h2>
      <div className={css["theme-wrap"]}>
        {
          [...Array(BASE_PARAMS.length)].map((el, i) => {
            return <BaseButton
              key={i}
              callBack={() => { setTheme(i); setStore("themeNumber", i) }}
              css={{ "backgroundColor": BASE_PARAMS[i]["color1"], "minWidth": "50px", "minHeight": "50px" }}
            >
              <div className={css["border"]} style={{ "backgroundColor": BASE_PARAMS[i]["color2"] }}></div>
            </BaseButton>
          }
          )
        }
      </div>
    </div>
  );
}

export { ThemeSelect };