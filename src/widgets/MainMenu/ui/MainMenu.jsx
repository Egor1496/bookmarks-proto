import React from "react";
import { Link } from "react-router-dom";

import sass from "./MainMenu.module.sass";

import { GroupLinks } from "../../../features";

import { Br, Logo } from "../../../shared/ui"; //BaseDropMenu

const MainMenu = ({ groups }) => {
  return (
    <div className={sass["mainMenuWrap"]}>
      <Link to="/bookmarks-proto" ><Logo /></Link>
      <Br style={{ "margin": "10px 0" }} />
      {/* <BaseDropMenu />
      <Br style={{ "margin": "10px 0" }} /> */}
      <GroupLinks groups={groups} />
      <Br style={{ "marginTop": "10px" }} />
    </div>
  );
}

export { MainMenu };