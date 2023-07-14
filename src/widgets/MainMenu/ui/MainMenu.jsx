import React from "react";
import { Link } from "react-router-dom";

import sass from "./MainMenu.module.sass";

import { GroupLinks } from "../../../features";
import { Br, LogoMyNotes, LogoBookMarks } from "../../../shared/ui"; //BaseDropMenu

const MainMenu = ({ groups }) => {
  return (
    <div className={sass["mainMenuWrap"]}>
      <Link to="/bookmarks-proto" ><LogoBookMarks /></Link>
      <Br />
      {/*<BaseDropMenu /> <Br style={{ "margin": "10px 0" }}/>*/}
      <GroupLinks groups={groups} />
      <Br />
      <Link to="/bookmarks-proto" ><LogoMyNotes /></Link>
    </div>
  );
}

export { MainMenu };