import React from "react";

import sass from "./Notification.module.sass";
import { BiError } from "react-icons/bi"

const Notification = (props) => {
	const {
		children,
		text,
		style,
		description,
		alarm,
		active
	} = props;

	return (
		<div className={`${sass.main} ${active ? sass.active : sass.close}`} >
			<div className={sass.wrap}>
				<div className={`${sass.notification} ${alarm && sass.alarm}`} style={style}>
					{children || <BiError />} <span>{text}</span> {description}
				</div>
			</div>
		</div >
	);
}

export { Notification };