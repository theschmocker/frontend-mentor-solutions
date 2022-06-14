import { getStores } from '$app/stores';
import { paintings, type Painting } from '$lib/data';
import { getContext, setContext } from 'svelte';
import { derived, get, writable, type Readable } from 'svelte/store';

export function createSlideshowStore() {
	const { page } = getStores();

	const activePainting = writable<Painting | null>(null);
	const activePaintingIndex = derived(activePainting, (active) =>
		active == null ? null : paintings.findIndex((p) => p.slug === active.slug) ?? null
	);
	const isSlideshowRunning = derived(activePaintingIndex, (index) => index != null);

	const previousPainting = derived(activePaintingIndex, (index) =>
		index == null ? null : paintings[index - 1] ?? null
	);
	const nextPainting = derived(activePaintingIndex, (index) =>
		index == null ? null : paintings[index + 1] ?? null
	);

	page.subscribe((p) => {
		if (p.url.pathname === '/') {
			activePainting.set(null);
		} else if (p.params.paintingSlug !== get(activePainting)?.slug) {
			activePainting.set(
				paintings.find((painting) => painting.slug === p.params.paintingSlug) ?? null
			);
		}
	});

	return {
		activePainting: readonly(activePainting),
		previousPainting,
		nextPainting,
		isSlideshowRunning,
	};
}

const key = Symbol('slideshow');

export function getSlideshowContext(): ReturnType<typeof createSlideshowStore> {
	return getContext(key);
}

export function setSlideshowContext(state: ReturnType<typeof createSlideshowStore>) {
	setContext(key, state);
}

function readonly<T>(writable: Readable<T>): Readable<T> {
	return {
		subscribe: writable.subscribe,
	};
}
