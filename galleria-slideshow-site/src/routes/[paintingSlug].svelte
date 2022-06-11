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
	export let painting: Painting;
</script>

<pre>{JSON.stringify(painting, null, 2)}</pre>
