import React from "react";
import sass from "./GetFile.module.sass"

import { FcDownload } from 'react-icons/fc';

import { BaseButton } from "../../../shared/ui";
import { getStore } from "../../../shared/model";

const GetFile = () => {

  const onAcept = () => {
    const prefix = '{"bookmarks":';
    const postfix = '}';
    downloadTxtFile(`${prefix}${getStore("bookmarks")}${postfix}`);
  }

  const downloadTxtFile = (text) => {
    const elem = document.createElement("a");
    const file = new Blob(
      [text],
      { type: 'text/plain;charset=utf-8' }
    );
    elem.href = URL.createObjectURL(file);
    elem.download = "all bookmarks (json).txt";
    document.body.appendChild(elem);
    elem.click();
  }

  return (
    <div className={sass.main}>
      <BaseButton
        text="Скачать"
        callBack={onAcept}>
        <FcDownload />
      </BaseButton>
    </div >
  );
}

export { GetFile };