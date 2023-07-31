import React from "react";
import { Link } from "react-router-dom";

import sass from "./Menu.module.sass";

import { GroupLinks } from "../../../features";
import { Br, LogoMyNotes, LogoBookMarks } from "../../../shared/ui"; //BaseDropMenu

const Menu = () => {
  return (
    <div className={sass["MenuWrap"]}>
      <Link to="/bookmarks-proto" >
        <LogoBookMarks />
      </Link>
      <Br />
      {/*<BaseDropMenu /> <Br style={{ "margin": "10px 0" }}/>*/}
      <GroupLinks />
      <Br />
      <Link to="/bookmarks-proto" >
        <LogoMyNotes />
      </Link>
    </div>
  );
}

export { Menu };