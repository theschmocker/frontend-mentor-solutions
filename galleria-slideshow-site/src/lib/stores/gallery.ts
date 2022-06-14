import { type Painting, paintings } from '$lib/data';
import { derived } from 'svelte/store';
import { useCurrentBreakpoint } from './media';

export function useGallery() {
	const breakpoint = useCurrentBreakpoint();

	const columns = derived(breakpoint, ($breakpoint) => {
		const numColumns = {
			xs: 1,
			sm: 1,
			md: 2,
			lg: 4,
			xl: 4,
			'2xl': 4,
		}[$breakpoint];

		const ordering = getOrdering(numColumns, paintings);

		return paintings.reduce((clms, painting, i) => {
			const colNum = ordering[painting.slug];
			let col = clms[colNum];
			if (!col) {
				col = [];
				clms[colNum] = col;
			}
			col.push(painting);
			return clms;
		}, [] as Painting[][]);
	});

	return {
		columns,
	};
}

function getOrdering(nCols: number, paintings: Painting[]): Record<string, number> {
	switch (nCols) {
		case 2:
			return {
				'starry-night': 0,
				'girl-with-pearl-earring': 1,
				guernica: 0,
				'penitent-magdalene': 1,
				'the-storm-on-the-sea-of-galilee': 0,
				'the-great-wave-off-kanagawa': 1,
				'van-gogh-self-portrait': 0,
				'the-sleeping-gypsy': 1,
				'lady-with-an-ermine': 0,
				'the-night-cafe': 1,
				'the-basket-of-apples': 1,
				'the-boy-in-the-red-vest': 0,
				'arnolfini-portrait': 1,
				'mona-lisa': 0,
				'the-swing': 1,
			};
		case 4:
			return {
				'starry-night': 0,
				'girl-with-pearl-earring': 1,
				guernica: 2,
				'penitent-magdalene': 3,
				'the-storm-on-the-sea-of-galilee': 0,
				'the-great-wave-off-kanagawa': 1,
				'van-gogh-self-portrait': 2,
				'the-sleeping-gypsy': 3,
				'lady-with-an-ermine': 0,
				'the-night-cafe': 1,
				'the-basket-of-apples': 3,
				'the-boy-in-the-red-vest': 0,
				'arnolfini-portrait': 1,
				'mona-lisa': 2,
				'the-swing': 3,
			};
	}

	return paintings.reduce((order, p) => ({ ...order, [p.slug]: 0 }), {});
}
