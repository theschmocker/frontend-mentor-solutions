<script lang="ts">
	export let name: string;
	export let value: string;
</script>

<div>
	<dt>{name}:{' '}</dt>
	<dd>{value}</dd>
</div>

<style lang="scss">
	div {
		font-size: var(--country-field-font-size, 1rem);
		line-height: var(--country-field-line-height, 2);
	}

	dd {
		display: inline;
		margin-left: 0;
		font-weight: 600;
	}

	dt {
		display: inline;
	}
</style>
