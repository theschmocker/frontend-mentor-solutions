<script lang="ts">
	import type { ListCountry } from '$lib/data/api';
	import CountryField from './CountryField.svelte';

	export let country: ListCountry;
</script>

<div class="country-card">
	<img src={country.flags.svg} alt="" />
	<div class="country-card__body">
		<a class="country-card__link" href="/country/{country.cca3}" sveltekit:prefetch>
			<h2 class="country-card__title">{country.name.common}</h2>
		</a>
		<dl class="country-card__stats">
			<CountryField name="Population" value={country.population.toLocaleString()} />
			<CountryField name="Region" value={country.region} />
			<CountryField name="Capital" value={country.capital.join(', ')} />
		</dl>
	</div>
</div>

<style lang="scss">
	.country-card {
		position: relative;
		box-shadow: 0px 0px 7px 2px rgba(0, 0, 0, 0.0294384);
		border-radius: 5px;
		overflow: hidden;
		background-color: var(--light-bg-color);
		transition: var(--theme-transition), transform 0.25s ease-in-out;

		&:hover,
		&:focus-within {
			transform: scale(1.02);
		}

		&:focus-within {
			outline: medium auto currentColor;
			outline: medium auto invert;
			outline: 5px auto -webkit-focus-ring-color;
		}

		img {
			aspect-ratio: 33/20;
			object-fit: cover;
			width: 100%;
		}

		&__body {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			padding: 24px 24px 46px 24px;
		}

		&__link {
			text-decoration: none;
			color: var(--text-color);
			outline: none;

			&::after {
				content: '';
				position: absolute;
				inset: 0;
			}
		}

		&__title {
			margin: 0;
		}

		&__stats {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			margin: 0;
			--country-field-font-size: 0.875rem;
			--country-field-line-height: 1.15;
		}
	}
</style>
