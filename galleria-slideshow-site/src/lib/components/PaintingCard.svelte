<script lang="ts">
	import type { Painting } from '$lib/data';

	export let painting: Painting;
</script>

<div class="relative">
	<img
		class="w-full"
		src={new URL(`../assets/${painting.images.thumbnail}`, import.meta.url).href}
		on:load
		alt=""
	/>
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
