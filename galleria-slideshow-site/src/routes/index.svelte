<script lang="ts">
	import PaintingCard from '$lib/components/PaintingCard.svelte';
	import { useGallery } from '$lib/stores/gallery';
	import { fade, fly } from 'svelte/transition';

	const { columns } = useGallery();
</script>

<div
	class="grid gap-[23px] p-6 items-start max-w-[1360px] mx-auto"
	style="grid-template-columns: repeat({$columns.length}, 1fr)"
	in:fade={{ delay: 400 }}
	out:fly={{ y: 25 }}
>
	{#each $columns as column}
		<div class="grid gap-[23px]">
			{#each column as painting (painting.name)}
				<PaintingCard {painting} />
			{/each}
		</div>
	{/each}
</div>
