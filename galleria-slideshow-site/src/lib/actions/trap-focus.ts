export function trapFocus(node: HTMLElement) {
	const lastFocusedElement = document.activeElement as HTMLElement;

	const listener = (e: KeyboardEvent) => {
		const { key, shiftKey, target } = e;

		if (key !== 'Tab') {
			return;
		}

		const focusableElements = getFocusableElements(node);

		// focus has somehow moved out of the node. return it to the first item.
		if (!node.contains(target as Node)) {
			e.preventDefault();
			first(focusableElements)?.focus();
			return;
		}

		const [end, oppositeEnd] = shiftKey
			? [first(focusableElements), last(focusableElements)]
			: [last(focusableElements), first(focusableElements)];

		if (target === end) {
			e.preventDefault();
			oppositeEnd?.focus();
		}
	};

	window.addEventListener('keydown', listener);

	first(getFocusableElements(node))?.focus();

	return {
		destroy() {
			window.removeEventListener('keydown', listener);
			lastFocusedElement.focus();
		},
	};
}

function first<T>(arr: T[]): T | undefined {
	return arr[0];
}

function last<T>(arr: T[]): T | undefined {
	return arr[arr.length - 1];
}

function getFocusableElements(element: HTMLElement) {
	return Array.from(
		element.querySelectorAll(
			'a[href], button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])'
		)
	).filter(
		(el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
	) as HTMLElement[];
}
