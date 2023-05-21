import React from "react";
import sass from "./BaseButton.module.sass";

const BaseButton = (props) => {

	const {
		text,
		disabled,
		callBack = (e) => { },
		floatIcon,
		btnStyle,
		hoverStyle,
		sizeStyle,
		border,
		children,
		buttonActive,
		css
	} = props;

	const styleName = `
		${sass.button || ""}
		${sass[floatIcon] || ""}
		${sass[btnStyle] || ""}
		${sass[hoverStyle] || ""}
		${sass[border] || ""}
		${sass[sizeStyle] || ""}
		${sass[buttonActive] || ""}
		${(disabled && sass.buttonDisabled) || ""}`.replace(/[\s\n]+/g, ' ');

	return (
		<div className={sass.main}>
			<button
				className={styleName}
				style={css}
				onClick={(e) => callBack(e)}
				disabled={disabled}>
				{children}
				{text}
			</button>
		</div >
	);
}

export { BaseButton };