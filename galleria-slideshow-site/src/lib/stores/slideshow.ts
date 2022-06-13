import { goto } from '$app/navigation';
import { getStores } from '$app/stores';
import { paintings, type Painting } from '$lib/data';
import { getContext, setContext } from 'svelte';
import { derived, get, writable, type Readable, type Writable } from 'svelte/store';

export function createSlideshowStore() {
	const { page } = getStores();

	const activePainting = writable<Painting | null>();
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
		} else {
			activePainting.set(
				paintings.find((painting) => painting.slug === p.params.paintingSlug) ?? null
			);
		}
	});

	activePainting.subscribe((active) => {
		if (active && active.slug !== get(page).params.paintingSlug) {
			goto(`/${active.slug}`);
		}
	});

	return {
		activePainting: readonly(activePainting),
		previousPainting,
		nextPainting,
		isSlideshowRunning,
		previous() {
			if (get(activePainting) == null) {
				return;
			}

			const previous = get(previousPainting);
			if (previous) {
				activePainting.set(previous);
			}
		},
		next() {
			if (get(activePainting) == null) {
				return;
			}

			const next = get(nextPainting);
			if (next) {
				activePainting.set(next);
			}
		},
		toggle() {
			if (get(activePainting)) {
				activePainting.set(null);
				goto('/');
			} else {
				activePainting.set(paintings[0]);
			}
		},
	};
}

const key = Symbol('slideshow');

export function getSlideshowContext(): ReturnType<typeof createSlideshowStore> {
	return getContext(key);
}

export function setSlideshowContext(state: ReturnType<typeof createSlideshowStore>) {
	setContext(key, state);
}

function readonly<T>(writable: Writable<T>): Readable<T> {
	return {
		subscribe: writable.subscribe,
	};
}
