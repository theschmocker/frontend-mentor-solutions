import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { onDestroy } from 'svelte';
import { browser } from '$app/env';

const storageKey = 'fe-mentor-countries-svelte-dark-mode';
export function useDarkMode(): Writable<boolean> {
	const darkMode = writable(false);

	if (browser) {
		darkMode.set(localStorage.getItem(storageKey) === 'true');

		const storageListener = () => {
			darkMode.set(localStorage.getItem(storageKey) === 'true');
		};

		window.addEventListener('storage', storageListener);
		onDestroy(() => window.removeEventListener('storage', storageListener));

		const unsubFromDarkMode = darkMode.subscribe(dark =>
			localStorage.setItem(storageKey, dark.toString())
		);
		onDestroy(() => unsubFromDarkMode());
	}

	return darkMode;
}
