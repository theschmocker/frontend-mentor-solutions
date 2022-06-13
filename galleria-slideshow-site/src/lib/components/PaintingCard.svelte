<script lang="ts">
	import type { Painting } from '$lib/data';
	import { getImageSrc, loadImage } from '$lib/util';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	export let painting: Painting;

	let imageLoaded = false;

	onMount(() => {
		loadImage(painting.images.thumbnail.image).then(() => (imageLoaded = true));
	});
</script>

<div class="relative">
	<div class="relative" style="padding-bottom: {painting.images.thumbnail.invertedAspectRatio}%">
		{#if imageLoaded}
			<img
				class="w-full h-full absolute inset-0 object-cover"
				src={getImageSrc(painting.images.thumbnail.image)}
				on:load
				alt=""
				in:fade|local
			/>
		{/if}
		<div
			style="background: linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.841672) 100%);"
			class="absolute inset-0 p-8 flex items-end"
		>
			<a href="/{painting.slug}" class="grid gap-[7px] before:absolute before:inset-0">
				<h2 class="text-white heading-2">{painting.name}</h2>
				<span class="text-white body">
					<span class="sr-only">by</span>
					{painting.artist.name}
				</span>
			</a>
		</div>
	</div>
</div>
