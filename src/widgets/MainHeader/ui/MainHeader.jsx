import React, { useContext } from "react";
import sass from "./MainHeader.module.sass";

import { Search, BaseSettings } from "../../../entities";
import { FastLinks } from "../../../features";
import { BookmarksContext } from "../../../processes/model/context";

const MainHeader = ({ enableSelectGroup, enableGroups, enableSelectTags, enableTags }) => {

  const onChangeInput = useContext(BookmarksContext);

  return (
    <div className={sass["mainWrap"]}>
      <div className={sass["inner-bottom"]}>
        <Search onChangeInput={onChangeInput} />
        <FastLinks />
        <BaseSettings
          enableSelectGroup={enableSelectGroup}
          enableGroups={enableGroups}
          enableSelectTags={enableSelectTags}
          enableTags={enableTags}
        />
      </div>
    </div>
  );
}

export { MainHeader };