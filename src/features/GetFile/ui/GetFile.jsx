import React, { useState } from "react";
import sass from "./GetFile.module.sass"

import { FcDownload } from 'react-icons/fc';

import { BaseButton, Notification } from "../../../shared/ui";
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
    sendMessage("Файл скачен!");
  }

  const [notification, setNotification] = useState({
    isOpen: false,
    text: "Готово!",
    description: "",
    alarm: false
  });

  const sendMessage = (text, description, alarm) => {
    setNotification({
      isOpen: true,
      text,
      description,
      alarm
    });
    setTimeout(() => {
      setNotification({
        isOpen: false,
        text,
        description,
        alarm
      });
    }, 3000);
  }

  return (
    <div className={sass.main}>
      <Notification
        text={notification.text}
        description={notification.description}
        alarm={notification.alarm}
        active={notification.isOpen} />
      <BaseButton
        text="Скачать"
        callBack={onAcept}>
        <FcDownload />
      </BaseButton>
    </div >
  );
}

export { GetFile };