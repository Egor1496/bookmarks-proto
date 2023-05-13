import React, { useContext } from "react";
import sass from "./MainHeader.module.sass";

import { Search, BaseSettings } from "../../../entities";
import { FastLinks } from "../../../features";
import { BookmarksContext } from "../../../processes/model/context";

const MainHeader = () => {

  const onChangeInput = useContext(BookmarksContext);

  return (
    <div className={sass["mainHeaderWrap"]}>
      <div className={sass["header-inner"]}>
        <Search
          onChangeInput={onChangeInput}
        />
        <BaseSettings />
      </div>
      <div className={sass["header-inner"]}>
        <FastLinks />
      </div>
    </div>
  );
}

export { MainHeader };