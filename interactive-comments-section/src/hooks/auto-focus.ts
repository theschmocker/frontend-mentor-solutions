import { useEffect, useRef } from "react";
import { elementIsInViewport } from "../util/viewport";

export function useAutoFocus<FocusEl extends HTMLElement, ScrollEl extends HTMLElement>(shouldFocus = true) {
	const focusRef = useRef<FocusEl | null>(null);
	const scrollRef = useRef<ScrollEl | null>(null);

	useEffect(() => {
		if (shouldFocus && focusRef.current && scrollRef.current) {
			setTimeout(() => {
				// must happen at end of event loop to counteract button focus on click
				focusRef.current?.focus({ preventScroll: true });

				// must happen at end of event loop to make sure enough of the element has animated in
				if (!elementIsInViewport(scrollRef.current)) {
					scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
				}

				if (isTextField(focusRef.current)) {
					const length = focusRef.current.textContent?.length ?? 0;
					focusRef.current.setSelectionRange(length, length);
				}
			}, 0);
		}
	}, [focusRef, scrollRef, shouldFocus]);

	return [focusRef, scrollRef] as const;
}

function isTextField(element: HTMLElement | null): element is HTMLTextAreaElement | HTMLInputElement {
	return element instanceof HTMLTextAreaElement || element instanceof HTMLInputElement;
}
