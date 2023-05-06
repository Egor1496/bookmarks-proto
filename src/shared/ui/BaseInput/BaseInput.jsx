import React from "react";
import css from "./BaseInput.module.sass";

const BaseInput = (props) => {

	const {
		state,
		setState,
		readonly,
		placeholder = "",
		onChangeInput = () => { }
	} = props;

	return (
		<div className={css.main}>
			<input className={`${css.input} ${readonly && css.disable}`}
				type="text" value={state}
				onChange={(e) => { onChangeInput(e); setState(prev => e.target.value); }}
				readOnly={readonly}
				placeholder={placeholder}
			/>
		</div>
	);
}

export { BaseInput };