import { getContext, setContext } from 'svelte';
import { derived, get, writable, type Readable, type Writable } from 'svelte/store';

const key = Symbol('select');

type SelectContext<T> = {
	open: Writable<boolean>;
	addOption: (optionValue: T) => void;
	removeOption: (optionValue: T) => void;
	selectedValue: Writable<T | null>;
	activeValue: Readable<T | null>;
	moveForward: (n?: number) => void;
	moveBackward: (n?: number) => void;
	moveToFirstItem: () => void;
	moveToLastItem: () => void;
};

export function getSelectContext<T>() {
	return getContext<SelectContext<T>>(key);
}

export function setSelectContext<T>(ctx: SelectContext<T>) {
	setContext(key, ctx);
}

export function createSelectContext<T>(): SelectContext<T> {
	const open = writable(false);
	const selectedValue = writable<T | null>(null);
	const options = writable<T[]>([]);

	const activeIndex = writable(0);
	const activeValue = derived(
		[options, activeIndex],
		([$options, $activeIndex]) => $options[$activeIndex] ?? null
	);

	return {
		open,
		selectedValue,
		activeValue,
		addOption: value => options.update(o => [...o, value]),
		removeOption: value => options.update(o => o.filter(v => v !== value)),
		moveToFirstItem: () => activeIndex.set(0),
		moveToLastItem: () => activeIndex.set(get(options).length - 1),
		moveForward: (n = 1) => activeIndex.update(i => Math.min(get(options).length - 1, i + n)),
		moveBackward: (n = 1) => activeIndex.update(i => Math.max(0, i - n)),
	};
}
