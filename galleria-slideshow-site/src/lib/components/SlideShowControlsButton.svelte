<script lang="ts">
	export let direction: 'previous' | 'next';
</script>

<button
	on:click
	class="text-black hover:opacity-50 disabled:opacity-[0.15] disabled:cursor-not-allowed transition-opacity"
	{...$$restProps}
>
	<svg
		width="17"
		height="16"
		viewBox="0 0 17 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class:rotate-180={direction === 'previous'}
	>
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M15.8683 8.07525L0.0185547 0.150391V16.0001L15.8683 8.07525ZM1.35189 13.8428V2.30745L12.8866 8.07478L1.35189 13.8428Z"
			fill="currentColor"
		/>
		<rect
			x="16.0527"
			y="0.247652"
			width="0.495304"
			height="15.3544"
			fill="#D8D8D8"
			stroke="currentColor"
			stroke-width="0.495304"
		/>
	</svg>
</button>
