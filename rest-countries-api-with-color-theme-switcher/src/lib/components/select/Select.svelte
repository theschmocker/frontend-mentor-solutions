<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	import { createSelectContext, setSelectContext } from './state';
	type T = $$Generic;

	export let value: T | null;

	const context = createSelectContext<T>();
	setSelectContext(context);

	const {
		open,
		selectedValue,
		activeValue,
		moveToFirstItem,
		moveToLastItem,
		moveForward,
		moveBackward,
	} = context;

	$: value = $selectedValue;

	onMount(() => {
		$selectedValue = value;
	});

	function handleKeydown(e: KeyboardEvent) {
		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				if ($open) {
					moveForward();
				} else {
					$open = true;
				}
				break;
			case 'ArrowUp':
				e.preventDefault();

				if ($open) {
					if (e.altKey) {
						$selectedValue = $activeValue;
						$open = false;
					} else {
						moveBackward();
					}
				} else {
					$open = true;
				}
				break;

			case 'Enter':
			case 'Space':
				e.preventDefault();
				if ($open) {
					$selectedValue = $activeValue;
					$open = false;
				} else {
					$open = true;
				}
				break;
			case 'Home':
				e.preventDefault();
				$open = true;
				moveToFirstItem();
				break;
			case 'End':
				e.preventDefault();
				$open = true;
				moveToLastItem();
				break;
			case 'Escape':
				if ($open) {
					e.preventDefault();
					$open = false;
				}
				break;
			case 'PageUp':
				if ($open) {
					e.preventDefault();
					moveForward(10);
				}
				break;
			case 'PageDown':
				if ($open) {
					e.preventDefault();
					moveBackward(10);
				}
				break;
			case 'Tab':
				if ($open) {
					$selectedValue = $activeValue;
					$open = false;
				}
				break;
		}
	}

	let container: HTMLElement;
	function handleFocusout(e: FocusEvent) {
		if (!container.contains(e.relatedTarget as HTMLElement)) {
			$open = false;
		}
	}
</script>

<div bind:this={container}>
	<span id="combo1-label" class="sr-only">Filter by region</span>
	<div class="combo js-select" class:open={$open}>
		<button
			aria-controls="listbox1"
			aria-expanded="false"
			aria-haspopup="listbox"
			aria-labelledby="combo1-label"
			aria-activedescendant="combo1-{activeValue ?? 'empty'}"
			id="combo1"
			class="combo-input"
			role="combobox"
			on:keydown={handleKeydown}
			on:click={e => {
				e.currentTarget.focus();
				$open = !$open;
			}}
			on:focusout={handleFocusout}
		>
			<slot name="button-text">{value ?? ''}</slot>
			<svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g id="expand-more">
					<path
						id="Shape"
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M7.875 0.875L5 3.75L2.125 0.875L1.25 1.75L5 5.5L8.75 1.75L7.875 0.875Z"
						fill="black"
						stroke="black"
					/>
				</g>
			</svg>
		</button>
		<div />
		{#if $open}
			<div
				transition:fly={{ y: -10 }}
				class="combo-menu"
				role="listbox"
				id="listbox1"
				aria-labelledby="combo1-label"
				tabindex="-1"
			>
				<slot />
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.combo {
		display: block;
		margin-bottom: 1.5em;
		position: relative;
		width: 200px;
	}

	.combo-input {
		background-color: var(--light-bg-color);
		padding: 0.875rem 1.5rem;
		border: none;
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
		font-size: 0.75rem;
		line-height: 1.66;
		padding: 12px 16px 14px;
		text-align: left;
		width: 100%;
		box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.0532439);
		border-radius: 5px;
		color: var(--text-color);
		&:focus {
			outline: medium auto currentColor;
			outline: medium auto invert;
			outline: 5px auto -webkit-focus-ring-color;
		}
	}

	.combo-label {
		display: block;
		font-size: 20px;
		font-weight: 100;
		margin-bottom: 0.25em;
	}

	.combo-menu {
		display: flex;
		flex-direction: column;
		gap: 4px;
		background-color: var(--light-bg-color);
		box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.0532439);
		padding: 1rem 1.25rem;
		border-radius: 5px;
		max-height: 300px;
		overflow-y: scroll;
		left: 0;
		position: absolute;
		top: calc(100% + 4px);
		width: 100%;
		z-index: 100;
	}
</style>
