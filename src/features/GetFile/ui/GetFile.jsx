import React, { useState } from "react";
import sass from "./GetFile.module.sass"

import { FcDownload } from 'react-icons/fc';

import { BaseButton, Notification } from "../../../shared/ui";
import { getStore, sendMesageNotification } from "../../../shared/model";

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
    sendMesageNotification({ text: "Файл скачен!" }, setNotification);
  }

  const [notification, setNotification] = useState();

  return (
    <div className={sass.main}>
      <Notification state={notification} setState={setNotification} />
      <BaseButton
        text="Скачать"
        callBack={onAcept}>
        <FcDownload />
      </BaseButton>
    </div >
  );
}

export { GetFile };