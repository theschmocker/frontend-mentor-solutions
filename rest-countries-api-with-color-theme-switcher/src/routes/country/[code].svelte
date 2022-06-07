<script context="module" lang="ts">
	import { getCountriesByCca3, getCountryByCca3, type Country } from '$lib/data/api';

	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params, fetch }) => {
		const country = await getCountryByCca3(params.code, fetch);
		const borderingCountries = country?.borders?.length
			? await getCountriesByCca3(country.borders, fetch)
			: [];

		if (!country) {
			return {
				status: 404,
			};
		}

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

	export let country: Country;
	export let borderingCountries: Country[] = [];

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
	<a class="back" href="/" sveltekit:prefetch>Back</a>

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
			<section>
				<h3>Bordering Countries</h3>
				{#each borderingCountries as borderCountry}
					<a href="/country/{borderCountry.cca3}">
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
		margin-bottom: 64px;

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

		@include desktop {
			flex-direction: row;
			justify-content: space-between;
		}
	}
</style>
