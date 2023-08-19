import { useRef, useEffect } from "react";

function useDebouncedFunction(func, delay, cleanUp = false) {
	const timeoutRef = useRef();

	function clearTimer() {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = undefined;
		}
	}

	useEffect(() => (cleanUp ? clearTimer : undefined), [cleanUp]);

	return (...args) => {
		clearTimer();
		timeoutRef.current = setTimeout(() => func(...args), delay);
	};
}

export { useDebouncedFunction };
