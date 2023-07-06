import React, { useContext } from "react";

import sass from "./GroupLinks.module.sass";
import { AiFillFolderOpen } from 'react-icons/ai';

import { FilterButtons } from "../../../processes/model/context"

import { BaseButton } from "../../../shared/ui";

const GroupLinks = ({ groups = [] }) => {

  const [
    onClick,
    activeGroupText
  ] = useContext(FilterButtons);

  return (
    <div className={sass.main}>
      {
        [...groups].map((el) => {
          const isPressed = activeGroupText.toLowerCase() === el.toLowerCase();
          return (
            <BaseButton
              key={el} text={el}
              callBack={() => { onClick(el, isPressed) }}
              styleNameList={[
                "transparentStyle",
                // "iconDarkColor",
                isPressed && "buttonActive"
              ]}
            ><AiFillFolderOpen /></BaseButton>
          )
        })
      }
    </div >
  );
}

export { GroupLinks };