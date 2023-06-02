import React, { useState } from "react";

import sass from "./Search.module.sass"
import { AiOutlineSearch } from "react-icons/ai"

import { BaseInput } from "../../../shared/ui";

const Search = ({ onChangeInput }) => {

  const [searchState, setSearchState] = useState("");

  const onChaneInputWrap = (state) => {
    setSearchState(state);
    onChangeInput(state);
  }

  return (
    <div className={sass.main}>
      <BaseInput
        placeholder="Поиск"
        state={searchState}
        setState={setSearchState}
        onChangeInput={onChaneInputWrap}
      >
        <AiOutlineSearch />
      </BaseInput>
    </div >
  );
}

export { Search };