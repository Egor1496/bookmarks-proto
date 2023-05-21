import React from "react";
import sass from "./Bookmark.module.sass"

import { BaseButton } from "../../../shared/ui"
import { fillBookmark } from "../../../features"

import { RxPencil2 } from 'react-icons/rx';
import { AiOutlineDelete } from 'react-icons/ai';

const Bookmark = (props) => {

  const {
    bookmark,
    onEditBookmark,
    onDeleteBookmark,
    styleNumber,
    onClickTags
  } = props;

  const fB = fillBookmark(bookmark);

  const baseURL = "https://besticon-demo.herokuapp.com/icon?url=",
    postfixUrl = "&size=80";

  const elemImg = fB.imgLink && (
    <div className={`${sass["preview"]}`}>
      <img src={baseURL + fB.imgLink + postfixUrl} alt="" />
    </div>
  );

  const elemTitle = fB.title && (<h2 className={`${sass["title"]}`}>{fB.title}</h2>);

  const elemDescription = fB.description && (
    <div className={`${sass["inner"]}`}>
      <p className={`${sass["description"]}`}>{fB.description}</p>
    </div>
  );

  const elemTags = fB.tags && (
    <ul className={`${sass["tags"]}`}>
      {
        fB.tags.map((elem, i) =>
          <li key={i} className={`${sass["tags-item"]}`}>
            <BaseButton
              callBack={(e) => { onClickTags(elem.trim()); e.stopPropagation() }}
              text={elem.trim()}
              sizeStyle="small"
            />
          </li>)
      }
    </ul>
  );

  return (
    <div className={sass.bookamrkWrap}>
      <div className={sass.deleteBookmark} onClick={(e) => { onDeleteBookmark(); }}>
        <AiOutlineDelete />
      </div>
      <div className={sass.changeBookmark} onClick={(e) => { onEditBookmark(); }}>
        <RxPencil2 />
      </div>
      <div
        className={`${sass["bookmark"]} ${sass["style-" + styleNumber + ""]}`}
        onClick={(e) => window.open(fB.link, '_blank').focus()}
      >
        <div className={`${sass["main-inner"]}`}>
          {elemImg}
          {elemTitle}
        </div>
        {
          (fB.description || fB.tags || fB.group || fB.time) &&
          <div className={`${sass["main-inner"]}`}>
            {elemDescription}
            <div className={`${sass["inner"]}`}>
              {elemTags}
            </div>
          </div>
        }
      </ div>
    </div>

  );
}

export { Bookmark };