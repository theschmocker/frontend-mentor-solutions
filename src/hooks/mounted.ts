import { useEffect, useRef } from "react";

export function useMounted(callback: () => void) {
	const isMounted = useRef(false);

	useEffect(() => {
		if (isMounted.current) {
			return;
		}

		isMounted.current = true;
		callback();
	}, [callback]);
}
