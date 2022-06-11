<script>
	import Header from '$lib/components/Header.svelte';
	import SlideshowControls from '$lib/components/SlideshowControls.svelte';
	import SlideshowStateProvider from '$lib/components/SlideshowStateProvider.svelte';
	import { createSlideshowStore } from '$lib/stores/slideshow';

	import '../app.css';
</script>

<SlideshowStateProvider>
	<Header />

	<main>
		<slot />
		<SlideshowControls />
	</main>
</SlideshowStateProvider>
