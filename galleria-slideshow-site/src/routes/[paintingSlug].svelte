<script context="module" lang="ts">
	import { paintings, type Painting } from '$lib/data';

	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ params }) => {
		const painting = paintings.find((p) => p.slug === params.paintingSlug);

		if (!painting) {
			return {
				status: 404,
				error: new Error(`Image ${params.paintingSlug} not found`)
			};
		}

		return {
			props: {
				painting
			}
		};
	};
</script>

<script lang="ts">
	import { navigating } from '$app/stores';
	import { fade, fly } from 'svelte/transition';
	import { getSlideshowContext } from '$lib/stores/slideshow';

	const { previousPainting, nextPainting } = getSlideshowContext();

	export let painting: Painting;
</script>

{#key painting.slug}
	<pre
		in:fly={{ delay: $navigating?.from.pathname === '/' ? 400 : 500, y: 50 }}
		out:fly={{ y: 50 }}>{JSON.stringify(painting, null, 2)}</pre>
{/key}
