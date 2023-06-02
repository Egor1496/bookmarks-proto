import React from "react";

import sass from "./Notification.module.sass";
import { BiError } from "react-icons/bi"

const Notification = (props) => {
	const {
		children = null,
		state = {
			text: "",
			style: {},
			description: "",
			alarm: false,
			active: false
		},
		// setState
	} = props;

	return (
		<div className={`${sass.main} ${state.active ? sass.active : sass.close}`} >
			<div className={sass.wrap}>
				<div className={`${sass.notification} ${state.alarm && sass.alarm}`} style={state.style}>
					{children || <BiError />} <span>{state.text}</span> {state.description}
				</div>
			</div>
		</div >
	);
}

export { Notification };