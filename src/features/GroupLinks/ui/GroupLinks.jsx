import React, { useContext } from "react";

import sass from "./GroupLinks.module.sass";
import { AiFillFolderOpen } from 'react-icons/ai';

import { FilterButtons } from "../../../processes/model/context"

import { BaseButton } from "../../../shared/ui";

const GroupLinks = ({ groups = [] }) => {

  const {
    onClickGroup,
    activeGroup
  } = useContext(FilterButtons);

  return (
    <div className={sass.main}>
      {
        [...groups].map((el) => {
          const isPressed = activeGroup.toLowerCase() === el.toLowerCase();
          return (
            <BaseButton
              key={el} text={el}
              callBack={() => { onClickGroup(el, isPressed) }}
              styleNameList={[
                "transparentStyle",
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