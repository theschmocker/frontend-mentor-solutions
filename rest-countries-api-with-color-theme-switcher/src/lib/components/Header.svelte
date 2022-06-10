<script lang="ts">
	import { browser } from '$app/env';
	import { useDarkMode } from '$lib/stores/dark-mode';

	const darkMode = useDarkMode();

	$: {
		if (browser) {
			document.body.classList.toggle('dark', $darkMode);
		}
	}
</script>

<header>
	<h1>Where in the world?</h1>
	<button class="dark-mode" on:click={() => ($darkMode = !$darkMode)}>
		<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M13.5532 13.815C9.66857 13.815 6.51929 10.9278 6.51929 7.36821C6.51929 6.0253 6.96679 4.78158 7.73143 3.75C4.69036 4.69515 2.5 7.33122 2.5 10.4381C2.5 14.3385 5.94929 17.5 10.2036 17.5C13.5929 17.5 16.4696 15.4932 17.5 12.7045C16.375 13.4048 15.0161 13.815 13.5532 13.815Z"
				fill="white"
				stroke={$darkMode ? 'white' : '#111517'}
				stroke-width="1.25"
			/>
		</svg>
		{$darkMode ? 'Light' : 'Dark'} Mode
	</button>
</header>

<style lang="scss">
	@import '../media';

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
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
		gap: 0.5rem;
		appearance: none;
		background: transparent;
		border: none;
		font-weight: 600;
		font-size: 0.75rem;
		line-height: 1.3;
		cursor: pointer;
		color: inherit;
		padding: 0.75rem 0.5rem;
		border-radius: 5px;

		&:hover {
			background: var(--bg-color);
		}

		@include desktop {
			font-size: 1rem;
		}
	}
</style>
