<script lang="ts">
	import { browser } from '$app/env';

	let darkMode = false;

	$: {
		if (browser) {
			document.body.classList.toggle('dark', darkMode);
		}
	}
</script>

<header>
	<h1>Where in the world?</h1>
	<button class="dark-mode" on:click={() => (darkMode = !darkMode)}
		>{darkMode ? 'Light' : 'Dark'} Mode</button
	>
</header>

<style lang="scss">
	@import '../media';

	header {
		display: flex;
		justify-content: space-between;
		background-color: var(--light-bg-color);
		padding: 1.875rem 1rem;
		margin-bottom: 1.5rem;

		@include desktop {
			padding: 1.5rem 5rem;
			margin-bottom: 3rem;
		}
	}

	h1 {
		font-size: 0.875rem;
		line-height: 1.43;
		font-weight: 800;

		@include desktop {
			font-size: 1.5rem;
			line-height: 1.36;
		}
	}

	.dark-mode {
		display: flex;
		align-items: center;
		appearance: none;
		background: transparent;
		border: none;
		font-weight: 600;
		font-size: 0.75rem;
		line-height: 1.3;
		cursor: pointer;
		color: inherit;
		padding: 0 0.5rem;
		border-radius: 5px;

		&:hover {
			background: var(--bg-color);
		}

		@include desktop {
			font-size: 1rem;
		}
	}
</style>
