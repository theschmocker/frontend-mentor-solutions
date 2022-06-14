import { onMount } from 'svelte';
import { writable } from 'svelte/store';

const breakpoints = {
	xs: 0,
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	'2xl': 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

export function useCurrentBreakpoint() {
	const current = writable<Breakpoint>('xs');
	const bps = Object.entries(breakpoints).sort(([_a, minWidthA], [_b, minWidthB]) =>
		minWidthA < minWidthB ? -1 : minWidthA === minWidthB ? 0 : 1
	) as [Breakpoint, number][];

	onMount(() => {
		const listenerPairs = bps.map(([breakpoint, value], i) => {
			const listener = ({ matches }: { matches: boolean }) => {
				if (matches) {
					current.set(breakpoint);
				}
			};

			const next = bps[i + 1];

			let query = `(min-width: ${value}px)`;
			if (next) {
				query += ` and (max-width: ${next[1] - 1}px)`;
			}

			const media = matchMedia(query);
			return [media, listener] as const;
		});

		listenerPairs.forEach(([media, listener]) => {
			media.addEventListener('change', listener);
			listener(media);
		});

		return () =>
			listenerPairs.forEach(([media, listener]) => media.removeEventListener('change', listener));
	});

	return current;
}
