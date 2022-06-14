<script lang="ts">
	import type { Painting } from '$lib/data';
	import { getImageSrc, loadImage } from '$lib/util/image';
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
		<noscript>
			<img
				class="w-full h-full absolute inset-0 object-cover"
				src={getImageSrc(painting.images.thumbnail.image)}
				alt=""
			/>
		</noscript>
		<div class="flex items-end absolute inset-0">
			<div
				class="absolute bottom-0 left-0 right-0 p-8 "
				style="height: 170px; background: linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.841672) 100%);"
			/>
			<a href="/{painting.slug}" class="z-10 grid gap-[7px] p-8 before:absolute before:inset-0">
				<h2 class="text-white heading-2">{painting.name}</h2>
				<span class="text-white body">
					<span class="sr-only">by</span>
					{painting.artist.name}
				</span>
			</a>
		</div>
	</div>
</div>
