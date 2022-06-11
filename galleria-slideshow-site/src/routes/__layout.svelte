<script>
	import Header from '$lib/components/Header.svelte';
	import SlideshowControls from '$lib/components/SlideshowControls.svelte';
	import { createSlideshowStore, setSlideshowContext } from '$lib/stores/slideshow';
	import '../app.css';

	const slideshowStore = createSlideshowStore();
	const { isSlideshowRunning } = slideshowStore;

	setSlideshowContext(slideshowStore);
</script>

<Header />

<main class:pb-20={$isSlideshowRunning}>
	<slot />
	<SlideshowControls />
</main>
