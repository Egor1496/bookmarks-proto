import React from "react";
import sass from "./ColorsDemo.module.sass"

import { Grid, GridСell } from "../../../shared/ui";

const ColorsDemo = () => {
  return (
    <div className={sass.div}>
      <Grid>
        <GridСell>
          <div className={sass.cellColor}>
            <div className={`${sass.color1}`}><h1>1</h1></div>
            <div className={`${sass.color2}`}><h1>2</h1></div>
            <div className={`${sass.color3}`}><h1>3</h1></div>
            <div className={`${sass.color4}`}><h1>4</h1></div>
            <div className={`${sass.color5}`}><h1>5</h1></div>
          </div>
        </GridСell>
        <GridСell>
          <div className={`${sass.colorDef1}`}><h1>colorDef1</h1></div>
          <div className={`${sass.colorDef2}`}><h1>colorDef2</h1></div>
        </GridСell>
        <GridСell>
          <div className={`${sass.сolorH}`}><h1>сolorH</h1></div>
          <div className={`${sass.сolorP}`}><h1>сolorP</h1></div>
        </GridСell>
        <GridСell>
          <div className={`${sass.сolorA1}`}><h1>сolorA1</h1></div>
          <div className={`${sass.сolorA2}`}><h1>сolorA2</h1></div>
        </GridСell>
        <GridСell>
          <div className={`${sass.fontSizeDef1}`}><h1>fontSizeDef1</h1></div>
          <div className={`${sass.fontSizeDef2}`}><h1>fontSizeDef2</h1></div>
          <div className={`${sass.fontSizeDef3}`}><h1>fontSizeDef3</h1></div>
        </GridСell>
      </Grid>
    </div>
  );
}

export { ColorsDemo };