<script lang="ts" context="module">
	import { getListCountries } from '$lib/data/api';

	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const countries = await getListCountries(fetch);

		return {
			stuff: {
				countries,
			},
		};
	};
</script>

<script>
	import Header from '$lib/components/Header.svelte';
	import '../normalize.css';
	import '$lib/global.scss';
</script>

<Header />
<main>
	<slot />
</main>

<style lang="scss">
	main {
		max-width: 1280px;
		margin: 0 auto;
	}
</style>
