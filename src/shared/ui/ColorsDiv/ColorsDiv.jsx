import React, { useState } from "react";
import css from "./ColorsDiv.module.sass";

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

const ColorsDiv = () => {
	const [timer, setTimer] = useState(0);

	return (
		<>{
			[...Array(100)].map((el, i) => {
				const r = getRandomInt(255),
					g = getRandomInt(255),
					b = getRandomInt(255);
				return (
					<div
						key={i}
						className={css.div}
						style={{ backgroundColor: `rgb(${r},${g},${b})` }}
						onClick={() => setTimer(timer + 1)}
					></div>
				)
			})
		}
		</>
	);
}

export { ColorsDiv };

// {`rgb(${r}, ${g}, ${b})`}