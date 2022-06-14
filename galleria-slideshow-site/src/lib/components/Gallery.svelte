<script lang="ts">
	import type { Painting } from '$lib/data';
	import { fly } from 'svelte/transition';
	import PaintingCard from './PaintingCard.svelte';

	export let columns: Painting[][];
	export { className as class };
	let className = '';
</script>

<div
	class="grid gap-[23px] p-6 md:p-10 md:gap-10 items-start max-w-[1440px] mx-auto {className}"
	style="grid-template-columns: repeat({columns.length}, 1fr)"
	in:fly={{ delay: 400, y: -10 }}
	out:fly={{ y: -10 }}
>
	{#each columns as column}
		<div class="grid gap-[23px] md:gap-10">
			{#each column as painting (painting.name)}
				<PaintingCard {painting} />
			{/each}
		</div>
	{/each}
</div>
