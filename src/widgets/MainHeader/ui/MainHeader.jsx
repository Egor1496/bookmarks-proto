import React from "react";
import sass from "./MainHeader.module.sass";

import { Search, BaseSettings } from "../../../entities";
import { FastLinks } from "../../../features";

const MainHeader = () => {
  return (
    <div className={sass["mainHeaderWrap"]}>
      <div className={sass["header-inner"]}>
        <Search />
        <BaseSettings />
      </div>
      <div className={sass["header-inner"]}>
        <FastLinks />
      </div>
    </div>
  );
}

export { MainHeader };