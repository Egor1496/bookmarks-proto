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

	let classNamesButton = `${sass[styleName] || ""}`;

	for (let i = 0; i < styleNameList.length; i++) {
		classNamesButton += " " + (sass[styleNameList[i]] || "");
	}

	const handlerClickButton = (e) => callBack(e);

	return (
		<div className={sass.main}>
			<button
				className={classNamesButton}
				style={css}
				onClick={handlerClickButton}
				disabled={disabled}>
				{children}
				{text}
			</button>
		</div >
	);
}

export { BaseButton };