import React from "react";
import sass from "./Aside.module.sass";

import { TagСloud } from "../../../entities"

const Aside = () => {
  return (
    <div className={sass["AsideWrap"]}>
      <TagСloud />
    </div>
  );
}

export { Aside };