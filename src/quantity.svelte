<script>
	import Basic from "./basic.svelte";
	export let n = 5;
	export let gridSize = 3;
	export let bg = "white";
	export let fg = "black";
	export let bg_opacity = 0.9;
	export let width = 160;
	export let height = 160;
	export let mode = "dice";
</script>

{#if mode == "basic"}<Basic
		{n}
		size={gridSize}
		base_color_face={bg}
		base_color_dot={fg}
		{bg_opacity}
		{width}
		{height}
	></Basic>
{:else}
	{n}
{/if}
