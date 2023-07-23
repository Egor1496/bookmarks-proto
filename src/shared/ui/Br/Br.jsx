import React from "react";
import sass from "./Br.module.sass";

const Br = ({ style }) => {
	return (
		<div className={sass.main} >
			<div className={`${sass.border}`} style={style} />
		</div >
	);
}

export { Br };