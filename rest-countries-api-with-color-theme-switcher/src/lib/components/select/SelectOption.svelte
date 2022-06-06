<script lang="ts">
	import { onMount, tick } from 'svelte';

	import { getSelectContext } from './state';

	type T = $$Generic;
	export let value: T;

	const { open, activeValue, selectedValue, removeOption, addOption } = getSelectContext<T>();

	$: active = $activeValue === value;
	$: selected = $selectedValue === value;

	onMount(() => {
		addOption(value);

		() => {
			removeOption(value);
		};
	});
</script>

<div
	role="option"
	id="combo1-{value ?? 'empty'}"
	class="combo-option"
	class:option-current={active}
	aria-selected={selected ? 'true' : 'false'}
	on:click={() => {
		$selectedValue = value;
		$open = false;
	}}
	{...$$props}
>
	<slot {selected} {active} />
</div>

<style lang="scss">
	.combo-option {
		font-size: 0.75rem;
		padding: 4px;
		cursor: pointer;
		&:hover {
			background-color: rgb(0 0 0 / 10%);
		}

		&.option-current {
			outline: medium auto currentColor;
			outline: medium auto invert;
			outline: 5px auto -webkit-focus-ring-color;
		}

		&[aria-selected='true'] {
			padding-right: 30px;
			position: relative;
		}

		&[aria-selected='true']::after {
			font-size: 0.75rem;
			border-bottom: 2px solid #b2b2b2;
			border-right: 2px solid #b2b2b2;
			content: '';
			height: 1em;
			position: absolute;
			right: 1em;
			top: 50%;
			transform: translate(0, -65%) rotate(45deg);
			width: 0.5em;
		}
	}
</style>
