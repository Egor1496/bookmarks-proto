import React, { useState, useContext } from "react";

import sass from "./Search.module.sass"
import { AiOutlineSearch } from "react-icons/ai"

import { store } from "../../../processes";

import { BaseInput } from "../../../shared/ui";
import { useDebouncedFunction } from "../../../shared/model";

const Search = () => {

  const [searchState, setSearchState] = useState("");

  const {
    bookmarksArray,
    setBookmarks,
    filter,
    sort
  } = useContext(store);

  const onChangeInput = (searchState) => setBookmarks(bookmarksArray.getBookmarks(filter, sort, searchState));

  const deferredSearch = useDebouncedFunction((state) => onChangeInput(state), 500);

  const handlerChaneInput = (state) => {
    setSearchState(state);
    deferredSearch(state);
  }

  return (
    <div className={sass.main}>
      <BaseInput
        placeholder="Поиск"
        state={searchState}
        setState={handlerChaneInput} //onChangeInput(searchText)
      >
        <AiOutlineSearch />
      </BaseInput>
    </div >
  );
}

export { Search };