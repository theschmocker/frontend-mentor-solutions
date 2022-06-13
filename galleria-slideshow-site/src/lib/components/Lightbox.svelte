<script lang="ts">
	import { trapFocus } from '$lib/actions/trap-focus';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	export let show: boolean;
	export let name: string;

	const dispatch = createEventDispatcher();

	function close() {
		dispatch('close');
	}
</script>

{#if show}
	<div
		class="fixed inset-0 z-10 flex items-center justify-center px-6 md:px-12 lg:px-[95px]"
		aria-modal="true"
		role="dialog"
		aria-label="Lightbox for painting {name}"
		use:trapFocus
		on:keydown={(e) => {
			if (e.key === 'Escape') {
				e.preventDefault();
				close();
			}
		}}
	>
		<div class="absolute inset-0 bg-black/50" on:click={close} transition:fade />
		<div class="relative z-10 flex flex-col items-end">
			<button class="link-1 text-white mb-9" on:click={close} transition:fade>Close</button>
			<!-- these images should have alt text -->
			<slot />
		</div>
	</div>
{/if}
