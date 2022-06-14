<script lang="ts">
	import Gallery from '$lib/components/Gallery.svelte';
	import { createGallery } from '$lib/util/gallery';

	const small = createGallery(1);
	const medium = createGallery(2);
	const large = createGallery(4);
</script>

<Gallery class="md:hidden" columns={small} />
<Gallery class="hidden md:grid lg:hidden" columns={medium} />
<Gallery class="hidden lg:grid" columns={large} />
