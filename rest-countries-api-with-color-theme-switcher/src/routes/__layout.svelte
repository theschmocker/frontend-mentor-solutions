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
