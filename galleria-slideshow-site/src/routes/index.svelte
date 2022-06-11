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
		'2xl': 4
	}[$breakpoint];

	$: columns = paintings.reduce((clms, painting, i) => {
		let colNum = i % numColumns;
		if (numColumns === 2 && i === paintings.length - 1) {
			colNum = numColumns - 1;
		}

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
	in:fly={{ y: 50, delay: 400 }}
	out:fly={{ y: 50 }}
>
	{#each columns as column, i}
		<div class="grid gap-[23px]">
			{#each column as painting, j (painting.name)}
				{@const index = i + j * numColumns}
				<div>
					{400 + index * 40}
					{index * 40}
					<PaintingCard {painting} />
				</div>
			{/each}
		</div>
	{/each}
</div>

<!-- display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(250px,1fr));
  grid-auto-rows: 20px; -->
