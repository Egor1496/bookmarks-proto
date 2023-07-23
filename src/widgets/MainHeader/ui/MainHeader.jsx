import React from "react";

import sass from "./MainHeader.module.sass";

import { FastLinks } from "../../../features";
import { Search, BaseSettings } from "../../../entities";
import { HeaderLogo } from "../../../shared/ui";

const MainHeader = () => {

  return (
    <div className={sass["mainWrap"]}>
      <div className={sass["inner"]}>
        <Search />
        <div className={sass["wrap"]}>
          <HeaderLogo text="BookMarks" />
          <FastLinks />
          <BaseSettings />
        </div>
      </div>
    </div>
  );
}

export { MainHeader };