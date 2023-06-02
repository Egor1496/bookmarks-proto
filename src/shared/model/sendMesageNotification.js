const sendMesageNotification = (state, setState) => {
	console.log(state);
	setState({
		active: true,
		text: state?.text,
		description: state?.description,
		alarm: state?.alarm,
		style: state?.style,
	});
	setTimeout(() => {
		setState({
			...state,
			active: false,
		});
	}, state?.delay || 2000);
};

export { sendMesageNotification };
