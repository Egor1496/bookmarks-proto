import React, { useContext } from "react";

import sass from "./MainHeader.module.sass";

import { BookmarksContext } from "../../../processes/model/context";
import { FastLinks } from "../../../features";
import { Search, BaseSettings } from "../../../entities";
import { HeaderLogo } from "../../../shared/ui";

const MainHeader = ({ enableSelectGroup, enableGroups, enableSelectTags, enableTags, enableSelectBg, enableBg }) => {

  const onChangeInput = useContext(BookmarksContext);

  return (
    <div className={sass["mainWrap"]}>
      <div className={sass["inner"]}>
        <Search onChangeInput={onChangeInput} />
        <div className={sass["wrap"]}>
          <HeaderLogo text="BookMarks" />
          <FastLinks />
          <BaseSettings
            enableSelectGroup={enableSelectGroup}
            enableGroups={enableGroups}
            enableSelectTags={enableSelectTags}
            enableTags={enableTags}
            enableSelectBg={enableSelectBg}
            enableBg={enableBg}
          />
        </div>

      </div>
    </div>
  );
}

export { MainHeader };