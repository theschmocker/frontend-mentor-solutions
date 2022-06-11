<script lang="ts">
	import { setSlideshowContext, createSlideshowStore } from '$lib/stores/slideshow';
	import { onMount } from 'svelte';

	setSlideshowContext(createSlideshowStore());
</script>

<slot />
