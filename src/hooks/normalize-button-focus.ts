import { useEffect } from "react";

// https://zellwk.com/blog/inconsistent-button-behavior/
export default function useNormalizeButtonFocus() {
	useEffect(() => {
		const listener = (e: MouseEvent) => {
			if (e.target instanceof HTMLElement && e.target.matches("button")) {
				e.target.focus({ preventScroll: true });
			}
		};
		document.addEventListener("click", listener);

		return () => document.removeEventListener("click", listener);
	}, []);
}
