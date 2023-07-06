import React from "react";

import { BASE_PARAMS } from "../../../shared/model";

const ThemeParams = ({ thisNumberTheme }) => {

  let style = ``;

  for (let key in BASE_PARAMS[thisNumberTheme]) {
    style += `  --${key}: ${BASE_PARAMS[thisNumberTheme][key]}; \n`;
  }

  return (
    <style type="text/css">
      {':root { \n' + style + '}'}
    </style>
  );
}

export { ThemeParams };