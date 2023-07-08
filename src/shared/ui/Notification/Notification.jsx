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
	} = props;

	const classNamesClose = `${sass.main} ${state.active ? sass.active : sass.close}`;
	const classNamesNotification = `${sass.notification} ${state.alarm && sass.alarm}`;

	return (
		<div className={classNamesClose} >
			<div className={sass.wrap}>
				<div className={classNamesNotification} style={state.style}>
					{children || <BiError />} <span>{state.text}</span> {state.description}
				</div>
			</div>
		</div >
	);
}

export { Notification };