import { useEffect, useRef } from "react";
import { elementIsInViewport } from "../util/viewport";

export function useAutoFocus<FocusEl extends HTMLElement, ScrollEl extends HTMLElement>(shouldFocus = true) {
	const focusRef = useRef<FocusEl | null>(null);
	const scrollRef = useRef<ScrollEl | null>(null);

	useEffect(() => {
		if (shouldFocus && focusRef.current && scrollRef.current) {
			focusRef.current.focus({ preventScroll: true });
			(focusRef.current as unknown as HTMLTextAreaElement).selectionStart;

			setTimeout(() => {
				if (!elementIsInViewport(scrollRef.current)) {
					// for some reason I couldn't determine, behavior: smooth doesn't work unless scrollIntoView is queued at the end
					// of the event loop. behavior: auto doesn't have this issue. I thought maybe useLayoutEffect would help, but no dice
					scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
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
