import React from "react";

import css from "./Demo.module.sass";

import {
  TypographyDemo,
  Custom
} from "../../../entities";

import { ColorsDiv } from "../../../shared/ui";

const Demo = () => {
  return (
    <div className={css.main}>
      <div className={css.divWrap}>
        <ColorsDiv />
      </div>
      <Custom />
      <TypographyDemo />
    </div>
  );
};

export { Demo };