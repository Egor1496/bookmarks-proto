import React, { useState } from "react";
import css from "./BaseToggleRadio.module.css";

const BaseToggleRadio = ({ onClickChange, defaultChecked = false }) => {
	const [isChecked, setIsChecked] = useState(defaultChecked);

	const handlerChangeInput = (e) => {
		setIsChecked(e.target.checked);
		onClickChange(e.target.checked);
	}

	return (
		<div className={`${css["switch_wrap"]}`}>
			<input type="checkbox" className={`${css["switch"]}`}
				checked={isChecked}
				onChange={handlerChangeInput}
			/>
		</div>
	);
}

export { BaseToggleRadio };