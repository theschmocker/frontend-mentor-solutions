import { type Painting, paintings } from '$lib/data';

export function createGallery(columns: number) {
	const ordering = getOrdering(columns, paintings);

	return paintings.reduce((clms, painting) => {
		const colNum = ordering[painting.slug];
		let col = clms[colNum];
		if (!col) {
			col = [];
			clms[colNum] = col;
		}
		col.push(painting);
		return clms;
	}, [] as Painting[][]);
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
