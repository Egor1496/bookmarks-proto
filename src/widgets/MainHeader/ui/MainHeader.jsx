import React, { useContext } from "react";
import sass from "./MainHeader.module.sass";

import { Search, BaseSettings } from "../../../entities";
import { FastLinks } from "../../../features";
import { BookmarksContext } from "../../../processes/model/context";

const MainHeader = () => {
  const [
    searchState,
    setSearchState,
    onChangeInput,
  ] = useContext(BookmarksContext);

  return (
    <div className={sass["mainHeaderWrap"]}>
      <div className={sass["header-inner"]}>
        <Search
          searchState={searchState}
          setSearchState={setSearchState}
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