<script lang="ts">
	import PaintingCard from '$lib/components/PaintingCard.svelte';
	import { paintings, type Painting } from '$lib/data';
	import '$lib/stores/media';
	import { useCurrentBreakpoint } from '$lib/stores/media';

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
		const colNum = i % numColumns;
		let col = clms[colNum];
		if (!col) {
			col = [];
			clms[colNum] = col;
		}
		col.push(painting);
		return clms;
	}, [] as Painting[][]);
</script>

<div
	class="grid gap-[23px] p-6 items-start max-w-[1360px] mx-auto"
	style="grid-template-columns: repeat({numColumns}, 1fr)"
>
	{#each columns as column}
		<div class="grid gap-[23px]">
			{#each column as painting (painting.name)}
				<PaintingCard {painting} />
			{/each}
		</div>
	{/each}
</div>

<!-- display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(250px,1fr));
  grid-auto-rows: 20px; -->
