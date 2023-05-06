import React from "react";
import sass from "./Search.module.sass"

import { BaseInput } from "../../../shared/ui";

const Search = ({ searchState, setSearchState, onChangeInput }) => {
  return (
    <div className={sass.main}>
      <BaseInput
        placeholder="Поиск"
        state={searchState}
        setState={setSearchState}
        onChangeInput={onChangeInput}
      />
    </div >
  );
}

export { Search };