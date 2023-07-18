import React, { useContext } from "react";

import sass from "./TagСloud.module.sass"
import { IoMdPricetag } from "react-icons/io";
import { BiReset } from "react-icons/bi";

import { FilterButtons } from "../../../processes/model/context"

import { BaseButton } from "../../../shared/ui";

const TagСloud = ({ tags = [] }) => {

  const { onClickTags, clearTags, activeTags } = useContext(FilterButtons);

  return (
    <>
      {
        activeTags ? (
          <div className={sass.clerTags}>
            <BaseButton text="Отмена" callBack={clearTags} styleName="transparentStyle">
              <BiReset />
            </BaseButton>
          </div>
        ) : (
          <div className={sass.titleWrap}>
            <IoMdPricetag />
            <h2 className={sass.title}>Теги</h2>
          </div>
        )

      }
      <div className={sass.tagsWrap}>
        {
          [...tags].map((el, i) => {
            return (
              <BaseButton
                key={el}
                text={el}
                styleNameList={[
                  "smallStyle",
                  activeTags.toLowerCase() === el.toLowerCase() && "buttonActive"
                ]}
                callBack={() => { onClickTags(el) }}
              >
                <IoMdPricetag style={{ transform: "translateY(1px)" }} />
              </BaseButton>
            )
          })
        }
      </div >
    </>
  );
}

export { TagСloud };