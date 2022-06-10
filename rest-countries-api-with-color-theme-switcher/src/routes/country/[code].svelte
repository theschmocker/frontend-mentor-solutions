<script context="module" lang="ts">
	import { getCountryByCode, type CountryDetails, type ListCountry } from '$lib/data/api';

	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params, fetch, stuff }) => {
		const country = await getCountryByCode(params.code, fetch);

		if (!country) {
			return {
				status: 404,
			};
		}

		const borderingCountryCodes = new Set(country.borders);
		const borderingCountries = borderingCountryCodes.size
			? stuff.countries?.filter((c: ListCountry) => borderingCountryCodes.has(c.cca3)) ?? []
			: [];

		return {
			props: {
				country,
				borderingCountries,
			},
		};
	};
</script>

<script lang="ts">
	import CountryField from '$lib/components/CountryField.svelte';

	export let country: CountryDetails;
	export let borderingCountries: ListCountry[] = [];

	$: fieldsGroup1 = (
		[
			['Native Name', Object.values(country.name?.nativeName ?? {})[0]?.common],
			['Population', country.population?.toLocaleString()],
			['Region', country.region],
			['Sub Region', country.subregion],
			['Capital', country.capital?.join(', ')],
		] as const
	).filter(([_, value]) => !!value);

	$: fieldsGroup2 = (
		[
			['Top Level Domain', country.tld?.join(', ')],
			[
				'Currencies',
				Object.values(country.currencies ?? {})
					.map(c => c.name)
					.join(', '),
			],
			['Languages', Object.values(country.languages ?? {}).join(', ')],
		] as const
	).filter(([_, value]) => !!value);
</script>

<article>
	<a class="back" href="/" sveltekit:prefetch>
		<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g id="call-made">
				<path
					id="Shape"
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M6.46447 4.10744L7.64298 5.28596L3.75389 9.17504L18.6031 9.17504L18.6031 10.825L3.75389 10.825L7.64298 14.714L6.46447 15.8926L0.57191 10L6.46447 4.10744Z"
					fill="currentColor"
				/>
			</g>
		</svg>

		Back
	</a>

	<section class="flag">
		<img src={country.flags.svg} alt="" />
	</section>
	<section class="info">
		<h2 class="name">{country.name.common}</h2>
		<dl class="fields">
			<div class="fields__group">
				{#each fieldsGroup1 as [name, value]}
					<CountryField {name} {value} />
				{/each}
			</div>
			<div class="fields__group">
				{#each fieldsGroup2 as [name, value]}
					<CountryField {name} {value} />
				{/each}
			</div>
		</dl>

		{#if borderingCountries.length}
			<section class="border-countries">
				<h3>Border Countries:</h3>
				{#each borderingCountries as borderCountry}
					<a href="/country/{borderCountry.cca3}" sveltekit:prefetch>
						{borderCountry.name.common}
					</a>
				{/each}
			</section>
		{/if}
	</section>
</article>

<style lang="scss">
	@import '../../lib/media';
	.back {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 39px 10px 32px;
		margin-bottom: 64px;
		background: var(--light-bg-color);
		color: var(--text-color);
		box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.293139);
		border-radius: 6px;
		justify-self: start;
		text-decoration: none;
		transition: var(--theme-transition), transform 0.1s ease-in-out;

		&:hover {
			transform: scale(1.05);
		}

		@include tablet {
			grid-column: 1 / -1;
			margin-bottom: 0;
		}
	}

	img {
		width: 100%;
	}

	article {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: calc(80px - 1.5rem) 1rem;

		@include tablet {
			display: grid;
			gap: 80px 120px;
			grid-template-columns: 45% auto;
		}
	}

	.name {
		margin: 0;
	}

	.flag {
		margin-bottom: 44px;
	}

	.fields {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		margin: 16px 0 34px 0;

		@include desktop {
			flex-direction: row;
			justify-content: space-between;
			margin: 23px 0 68px 0;
		}
	}

	.border-countries {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px 12px;

		h3 {
			flex-shrink: 0;
			margin: 0;
			padding-right: 6px;
		}

		a {
			background: var(--light-bg-color);
			box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.104931);
			border-radius: 2px;
			padding: 5px 10px;
			min-width: 96px;
			text-decoration: none;
			color: var(--text-color);
			text-align: center;
			&:hover {
				transform: scale(1.05);
			}
		}
	}
</style>
