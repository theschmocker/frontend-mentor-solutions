export function elementIsInViewport(element: Element | null): boolean {
	if (!element) {
		return false;
	}

	const { top, bottom } = element.getBoundingClientRect();

	const withinBottomBoundary = bottom < window.innerHeight;
	const withinTopBoundary = top > 0;

	return withinTopBoundary && withinBottomBoundary;
}
