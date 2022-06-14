<script lang="ts">
	import PaintingCard from '$lib/components/PaintingCard.svelte';
	import { useGallery } from '$lib/stores/gallery';
	import { fly } from 'svelte/transition';

	const { columns } = useGallery();
</script>

<div
	class="grid gap-[23px] p-6 md:p-10 md:gap-10 items-start max-w-[1360px] mx-auto"
	style="grid-template-columns: repeat({$columns.length}, 1fr)"
	in:fly={{ delay: 400, y: -10 }}
	out:fly={{ y: -10 }}
>
	{#each $columns as column}
		<div class="grid gap-[23px] md:gap-10">
			{#each column as painting (painting.name)}
				<PaintingCard {painting} />
			{/each}
		</div>
	{/each}
</div>
