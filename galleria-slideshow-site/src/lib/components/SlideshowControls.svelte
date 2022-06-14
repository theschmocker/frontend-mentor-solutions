<script lang="ts">
	import { getSlideshowContext } from '$lib/stores/slideshow';
	import { slide } from 'svelte/transition';
	import { spring } from 'svelte/motion';
	import { paintings } from '$lib/data';
	import SlideShowControlsButton from './SlideShowControlsButton.svelte';

	const { activePainting, next, nextPainting, previous, previousPainting } = getSlideshowContext();

	const progress = spring(0);

	$: painting = $activePainting?.current;

	$: if (painting) {
		progress.set((paintings.indexOf(painting) + 1) / paintings.length);
	}
</script>

{#if painting}
	<section
		aria-label="Slideshow controls"
		transition:slide
		class="fixed w-full left-0 bottom-0 right-0 bg-white"
	>
		<div class="h-[1px] bg-gray-200">
			<div
				class="h-full bg-black origin-left will-change-transform"
				style="transform: scaleX({$progress});"
			/>
		</div>
		<div class="py-4 px-6 md:py-6 md:px-10 flex items-center justify-between">
			<div>
				<h2 class="subhead-2 text-[14px] md:text-[18px]">
					<span class="sr-only">Active painting:</span>
					{painting.name}
				</h2>
				<p class="subhead-1 text-[10px] md:text-[13px] mt-2">{painting.artist.name}</p>
			</div>

			<div class="grid grid-cols-2 gap-6 md:gap-10">
				<SlideShowControlsButton
					on:click={previous}
					aria-label="Previous painting"
					disabled={!$previousPainting}
					direction="previous"
				/>
				<SlideShowControlsButton
					on:click={next}
					aria-label="Next painting"
					disabled={!$nextPainting}
					direction="next"
				/>
			</div>
		</div>
	</section>
{/if}
