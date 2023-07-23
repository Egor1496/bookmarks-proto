import React, { useState, useContext } from "react";

import sass from "./Search.module.sass"
import { AiOutlineSearch } from "react-icons/ai"

import { Store } from "../../../processes/model/context";

import { BaseInput } from "../../../shared/ui";
import { debounce } from "../../../shared/model";

const Search = () => {

  const [searchState, setSearchState] = useState("");

  const {
    bookmarksArray,
    setBookmarks,
    filter,
    sort
  } = useContext(Store);

  const onChangeInput = (searchState) => setBookmarks(bookmarksArray.getBookmarks(filter, sort, searchState));

  const handlerChaneInput = (state) => {
    debounce(() => {
      setSearchState(state);
      onChangeInput(state);
    }, 500)();
  }

  return (
    <div className={sass.main}>
      <BaseInput
        placeholder="Поиск"
        state={searchState}
        setState={setSearchState}
        onChangeInput={handlerChaneInput}
      >
        <AiOutlineSearch />
      </BaseInput>
    </div >
  );
}

export { Search };