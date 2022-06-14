<script>
	import Header from '$lib/components/Header.svelte';
	import SlideshowControls from '$lib/components/SlideshowControls.svelte';
	import { createSlideshowStore, setSlideshowContext } from '$lib/stores/slideshow';
	import '../app.css';

	const slideshowStore = createSlideshowStore();
	const { isSlideshowRunning } = slideshowStore;

	setSlideshowContext(slideshowStore);

	$: controlPadding = $isSlideshowRunning ? 'pb-20 md:pb-[96px]' : '';
</script>

<Header />

<main class={controlPadding}>
	<slot />
	<SlideshowControls />
</main>
