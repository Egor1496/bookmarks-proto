import React, { useState } from "react";
import sass from "./Search.module.sass"

import { BaseInput } from "../../../shared/ui";

let isSearch = false;

const Search = ({ onChangeInput }) => {

  const [searchState, setSearchState] = useState("");

  const onChaneInputWrap = () => {
    setSearchState(searchState);
    if (!isSearch)
      setTimeout(() => {
        onChangeInput(searchState);
        isSearch = false;
      }, 300);
    isSearch = true;
  }

  return (
    <div className={sass.main}>
      <BaseInput
        placeholder="Поиск"
        state={searchState}
        setState={setSearchState}
        onChangeInput={onChaneInputWrap}
      />
    </div >
  );
}

export { Search };