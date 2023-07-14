import React from "react";

import sass from "./HeaderLogo.module.sass";

const HeaderLogo = ({ text }) => {
	return (
		<div className={sass.logoWrap}>
			<div className={sass.after}></div>
			<div className={sass.logo}>
				<div className={sass.logoText}>
					<h2>{text}</h2>
				</div>
			</div>
			<div className={sass.before}></div>
		</div>
	);
}

export { HeaderLogo };