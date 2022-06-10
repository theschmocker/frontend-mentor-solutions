<script lang="ts" context="module">
	import type { ListCountry } from '$lib/data/api';

	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ stuff }) => {
		return {
			props: {
				countries: stuff.countries,
			},
		};
	};
</script>

<script lang="ts">
	import CountryCard from '$lib/components/CountryCard.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import SelectOption from '$lib/components/select/SelectOption.svelte';

	export let countries: ListCountry[];

	let search = '';
	let filterRegion: string | null = null;

	$: regions = new Set(countries.map(c => c.region));

	$: filteredCountries = countries.filter(country => {
		const {
			name: { common: commonName, official: officialName, nativeName },
			region,
		} = country;

		if (filterRegion && region !== filterRegion) {
			return false;
		}

		if (!search) {
			return true;
		}

		const fieldsToSearch = [
			commonName,
			officialName,
			region,
			Object.values(nativeName).map(n => Object.values(n)),
		]
			.flat(2)
			.map(f => f.toLocaleLowerCase());

		return fieldsToSearch.some(f => f.includes(search.toLocaleLowerCase()));
	});
</script>

<div class="search-wrapper">
	<form on:submit|preventDefault>
		<label class="search">
			<div>
				<svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<g id="search">
						<path
							id="Shape"
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M11.1111 9.77778H10.4L10.1333 9.51111C11.0222 8.53333 11.5556 7.2 11.5556 5.77778C11.5556 2.57778 8.97778 0 5.77778 0C2.57778 0 0 2.57778 0 5.77778C0 8.97778 2.57778 11.5556 5.77778 11.5556C7.2 11.5556 8.53333 11.0222 9.51111 10.1333L9.77778 10.4V11.1111L14.2222 15.5556L15.5556 14.2222L11.1111 9.77778ZM5.77778 9.77778C3.55556 9.77778 1.77778 8 1.77778 5.77778C1.77778 3.55556 3.55556 1.77778 5.77778 1.77778C8 1.77778 9.77778 3.55556 9.77778 5.77778C9.77778 8 8 9.77778 5.77778 9.77778Z"
							fill="#B2B2B2"
						/>
					</g>
				</svg>
				<span class="sr-only">Search for a country...</span>
			</div>
			<input type="text" name="search" placeholder="Search for a country..." bind:value={search} />
		</label>
	</form>

	<Select bind:value={filterRegion}>
		<svelte:fragment slot="button-text">
			{filterRegion == null ? 'Filter by Region' : filterRegion}
		</svelte:fragment>
		<SelectOption value={null}>All Regions</SelectOption>
		{#each [...regions] as region (region)}
			<SelectOption value={region}>{region}</SelectOption>
		{/each}
	</Select>
</div>

<div class="countries">
	{#each filteredCountries as country (country.cca3)}
		<CountryCard {country} />
	{:else}
		No Results
	{/each}
</div>

<style lang="scss">
	@import '../lib/media';

	.countries {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(auto, 1fr));
		gap: 40px;
		padding: 2rem 3.5rem;

		@include tablet {
			grid-template-columns: repeat(auto-fill, minmax(264px, 1fr));
		}

		@include desktop {
			gap: 74px;
			padding: 3.5rem;
		}

		@include desktop-large {
			padding: 0;
		}
	}

	.search-wrapper {
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		padding: 0 1rem;
		gap: 40px;

		@include tablet {
			flex-direction: row;
			padding: 0 3.5rem;
		}

		@include desktop-large {
			padding: 0;
			margin-bottom: 3rem;
		}
	}

	form {
		flex: 1;
	}

	.search {
		display: flex;
		background-color: var(--light-bg-color);
		height: 3rem;
		box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.0532439);
		border-radius: 5px;
		overflow: hidden;
		widows: 100%;

		@include tablet {
			max-width: 343px;
		}

		@include desktop {
			max-width: 480px;
		}

		&:focus-within {
			outline: medium auto currentColor;
			outline: medium auto invert;
			outline: 5px auto -webkit-focus-ring-color;
		}

		div {
			display: flex;
			align-items: center;
			padding: 0 26px 0 32px;
		}

		input {
			flex: 1;
			background-color: inherit;
			border: none;
			outline: none;
			font-family: inherit;
			font-size: 0.75rem;
			color: var(--text-color);

			&::placeholder {
				color: #757575;
			}

			@include tablet {
				font-size: 0.875rem;
			}
		}
	}
	.dark .search input::placeholder {
		color: var(--text-color);
	}
</style>
