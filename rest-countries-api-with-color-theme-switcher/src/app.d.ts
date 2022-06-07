/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	import type { ListCountry } from '$lib/data/api';

	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	interface Stuff {
		countries: ListCountry[];
	}
}
