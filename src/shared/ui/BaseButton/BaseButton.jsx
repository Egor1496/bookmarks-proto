import React from "react";
import sass from "./BaseButton.module.sass";

const BaseButton = (props) => {

	const {
		text,
		css,
		styleName,
		styleNameList = [],
		disabled,
		callBack,
		children,
	} = props;

	let styleNames = `${sass[styleName] || ""}`;

	for (let i = 0; i < styleNameList.length; i++) {
		styleNames += " " + (sass[styleNameList[i]] || "");
	}

	return (
		<div className={sass.main}>
			<button
				className={styleNames}
				style={css}
				onClick={callBack}
				disabled={disabled}>
				{children}
				{text}
			</button>
		</div >
	);
}

export { BaseButton };