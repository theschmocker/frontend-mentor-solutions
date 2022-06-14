<script context="module" lang="ts">
	import { paintings, type Painting } from '$lib/data';

	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ params }) => {
		const painting = paintings.find((p) => p.slug === params.paintingSlug);

		if (!painting) {
			return {
				status: 404,
				error: new Error(`Image ${params.paintingSlug} not found`),
			};
		}

		return {
			props: {
				painting,
			},
		};
	};
</script>

<script lang="ts">
	import { navigating } from '$app/stores';
	import { crossfade, fade, fly } from 'svelte/transition';
	import { getImageSrc, loadImage } from '$lib/util/image';
	import Lightbox from '$lib/components/Lightbox.svelte';
	import { getSlideshowContext } from '$lib/stores/slideshow';
	import { sineOut } from 'svelte/easing';

	export let painting: Painting;

	const [send, receive] = crossfade({
		duration: 400,
		fallback(node, params) {
			return fade(node, { ...params, duration: 400 });
		},
	});

	$: thumbnailKey = painting.slug + '-img';
	// make sure it transitions normally with the rest of the content when changing painting/leaving slideshow
	$: thumbnailOutKey = lightboxImageSrc != null ? thumbnailKey : thumbnailKey + 'out';

	let lightboxImageSrc: string | null;
	let loading = false;

	async function showLightbox() {
		const t = setTimeout(() => {
			loading = true;
		}, 100);
		lightboxImageSrc = await loadImage(painting.images.gallery);
		clearTimeout(t);
		loading = false;
	}

	function hideLightbox() {
		loading = false;
		lightboxImageSrc = null;
	}

	const { nextPainting } = getSlideshowContext();

	$: goingToOrFromList = $navigating?.from.pathname === '/' || $navigating?.to.pathname === '/';
	$: movingForward = painting === $nextPainting;
	$: transition = {
		in: {
			delay: goingToOrFromList ? 400 : 425,
			y: goingToOrFromList ? 25 : 0,
			x: goingToOrFromList ? 0 : movingForward ? 50 : -50,
			easing: sineOut,
		},
		out: {
			y: goingToOrFromList ? 25 : 0,
			x: goingToOrFromList ? 0 : movingForward ? -50 : 50,
			easing: sineOut,
		},
	};
</script>

<svelte:head>
	<title>{painting.name} | galleria</title>
	<meta name="description" content={painting.description} />
</svelte:head>

{#key painting.slug}
	<article
		class="p-6 md:p-10 lg:mt-[100px] lg:grid lg:grid-cols-[63%_1fr] lg:gap-[30px] max-w-[1440px] mx-auto"
		in:fly={transition.in}
		out:fly={transition.out}
	>
		<header class="relative">
			<div class="relative">
				<div class="md:w-[69%] lg:w-[55%]">
					<picture class="relative block pb-[86%] w-full md:pb-[117%]">
						<source media="(min-width: 1024px)" srcset={getImageSrc(painting.images.hero.large)} />
						{#if !lightboxImageSrc}
							<img
								class="block absolute inset-0 w-full h-full object-cover"
								src={getImageSrc(painting.images.hero.small)}
								alt=""
								in:receive={{ key: thumbnailKey }}
								out:send={{ key: thumbnailOutKey }}
							/>
						{/if}
					</picture>
				</div>
				<button
					class="flex items-center absolute top-4 left-4 md:top-auto md:bottom-4 bg-black/75 hover:bg-white/25 text-white px-4 py-[14px] uppercase text-[10px] leading-3 tracking-[2.14px]"
					disabled={loading}
					on:click={showLightbox}
				>
					<svg
						width="12"
						height="12"
						viewBox="0 0 12 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						class="mr-[14px]"
					>
						<path
							d="M7.71407 0L9.21407 1.5L6.85693 3.85714L8.14264 5.14285L10.4998 2.78571L11.9998 4.28571V0H7.71407Z"
							fill="white"
						/>
						<path
							d="M3.85714 6.85718L1.5 9.21432L0 7.71431V12H4.28571L2.78571 10.5L5.14285 8.14288L3.85714 6.85718Z"
							fill="white"
						/>
						<path
							d="M8.14264 6.85718L6.85693 8.14288L9.21407 10.5L7.71407 12H11.9998V7.71431L10.4998 9.21432L8.14264 6.85718Z"
							fill="white"
						/>
						<path
							d="M4.28571 0H0V4.28571L1.5 2.78571L3.85714 5.14285L5.14285 3.85714L2.78571 1.5L4.28571 0Z"
							fill="white"
						/>
					</svg>

					{#if loading}
						Loading...
					{:else}
						View Image
					{/if}
				</button>
			</div>
			<div
				class="relative -mt-[50px] md:absolute md:mt-0 md:top-0 md:right-0 md:max-w-[65%] lg:max-w-[52%]"
			>
				<div
					class="bg-white p-6 max-w-[280px] md:pl-[65px] md:pr-0 md:pb-[67px] md:pt-0 md:max-w-none"
				>
					<h2 class="heading-2 md:heading-1">{painting.name}</h2>
					<p class="subhead-1 mt-2 text-gray-300 md:mt-6">{painting.artist.name}</p>
				</div>
				<img
					class="h-16 w-16 md:h-32 md:w-32 ml-4 md:ml-auto md:mr-11"
					src={getImageSrc(painting.artist.image)}
					alt=""
				/>
			</div>
		</header>
		<div class="-mt-5 md:mt-16 lg:mt-0">
			<div
				class="heading-display text-[100px] text-right md:text-[200px] md:text-left lg:text-[150px] xl:text-[200px] select-none"
			>
				{painting.year}
			</div>
			<div
				class="body mb-[68px] md:mb-10 -mt-3 md:-mt-[75px] md:px-[115px] lg:px-0 lg:max-w-[350px] lg:-mt-[35px]"
			>
				{painting.description}
			</div>
			<a
				class="link-2 md:ml-[115px] lg:ml-0"
				href={painting.source}
				rel="noopener noreferrer"
				target="_blank"
			>
				Go to Source
			</a>
		</div>
	</article>
{/key}

<Lightbox name={painting.name} show={!!lightboxImageSrc} on:close={hideLightbox}>
	{#if lightboxImageSrc}
		<img
			src={lightboxImageSrc}
			in:receive={{ key: thumbnailKey }}
			out:send={{ key: thumbnailKey }}
			alt={painting.description}
		/>
	{/if}
</Lightbox>
