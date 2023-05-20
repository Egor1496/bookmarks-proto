import React from "react";
import sass from "./BaseButton.module.sass";

const BaseButton = (props) => {

	const {
		text,
		disabled,
		callBack,
		floatIcon,
		btnStyle,
		hoverStyle,
		sizeStyle,
		border,
		children,
		buttonActive,
		css
	} = props;

	console.log(css)

	return (
		<div className={sass.main}>
			<button
				className={`
					${sass.button}
					${sass[floatIcon]}
					${sass[btnStyle]}
					${sass[hoverStyle]}
					${sass[border]}
					${sass[sizeStyle]}
					${sass[buttonActive]}
					${disabled && sass.buttonDisabled}
				`}
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