<script lang="ts">
	import { navigating } from '$app/stores';

	import PaintingCard from '$lib/components/PaintingCard.svelte';
	import { paintings, type Painting } from '$lib/data';
	import '$lib/stores/media';
	import { useCurrentBreakpoint } from '$lib/stores/media';
	import { fade, fly, scale } from 'svelte/transition';

	const breakpoint = useCurrentBreakpoint();
	$: numColumns = {
		xs: 1,
		sm: 1,
		md: 2,
		lg: 4,
		xl: 4,
		'2xl': 4,
	}[$breakpoint];

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

	$: ordering = getOrdering(numColumns, paintings);

	$: columns = paintings.reduce((clms, painting, i) => {
		const colNum = ordering[painting.slug];
		let col = clms[colNum];
		if (!col) {
			col = [];
			clms[colNum] = col;
		}
		col.push(painting);
		return clms;
	}, [] as Painting[][]);

	$: console.log($navigating);
</script>

<div
	class="grid gap-[23px] p-6 items-start max-w-[1360px] mx-auto"
	style="grid-template-columns: repeat({numColumns}, 1fr)"
	in:fade={{ delay: 400 }}
	out:fly={{ y: 25 }}
>
	{#each columns as column, i}
		<div class="grid gap-[23px]">
			{#each column as painting, j (painting.name)}
				<div>
					<PaintingCard {painting} />
				</div>
			{/each}
		</div>
	{/each}
</div>
