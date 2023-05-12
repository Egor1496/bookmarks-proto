import React from "react";
import sass from "./Bookmark.module.sass"

import { BaseButton } from "../../../shared/ui"
import { fillBookmark } from "../../../features"

// import { AiFillFolderOpen } from 'react-icons/ai';
import { RxPencil2 } from 'react-icons/rx';
import { AiOutlineDelete } from 'react-icons/ai';

const Bookmark = (props) => {

  const {
    bookmark,
    onEditBookmark,
    onDeleteBookmark,
    styleNumber
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
            <BaseButton text={elem.trim()} sizeStyle="small"></BaseButton>
          </li>)
      }
    </ul>
  );

  // console.log(styleNumber);

  return (
    <div className={sass.bookamrkWrap}>
      <div className={sass.deleteBookmark} onClick={(e) => { onDeleteBookmark(); }}>
        <AiOutlineDelete />
      </div>
      <div className={sass.changeBookmark} onClick={(e) => { onEditBookmark(); }}>
        <RxPencil2 />
      </div>
      <a className={`${sass["bookmark"]} ${sass["style-" + styleNumber + ""]}`} href={fB.link} target="_blank" rel="noreferrer">
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
      </ a>
    </div>

  );
}

export { Bookmark };