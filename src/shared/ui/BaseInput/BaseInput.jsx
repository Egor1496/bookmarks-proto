import React from "react";
import sass from "./BaseInput.module.sass";

const BaseInput = (props) => {

	const {
		state,
		setState,
		readonly,
		placeholder = "",
		children,
		onChangeInput = () => { }
	} = props;

	return (
		<div className={sass.main}>
			<input className={`${sass.input} ${(readonly && sass.disable) || ""}`}
				type="text" value={state}
				onChange={(e) => {
					onChangeInput(e.target.value);
					setState(e.target.value);
				}}
				readOnly={readonly}
				placeholder={placeholder}
			/>
			<div className={sass.icon}>
				{children}
			</div>
		</div>
	);
}

export { BaseInput };