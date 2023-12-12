<script>
	import Abstractimage from "./abstractimage.svelte";
	import Quantity from "./quantity.svelte";
	export let page = "home";
	export let params = {};
	let possibleSources = ["img/p1.jpg", "img/p2.jpg", "img/p3.jpg", "img/p4.webp", "img/p5.avif", "img/p6.webp", "img/p7.jpg", "img/p8.webp"];
	let mode1 = possibleSources[Math.floor(Math.random() * possibleSources.length)];
	possibleSources.splice(possibleSources.indexOf(mode1), 1);
	let mode2 = possibleSources[Math.floor(Math.random() * possibleSources.length)];
	possibleSources.splice(possibleSources.indexOf(mode2), 1);
	let mode3 = possibleSources[Math.floor(Math.random() * possibleSources.length)];
</script>

<h1 align="center">Delayed match to sample</h1>

<h5 align="center">
	Test for cognitive assessment
</h5>

<table align="center">
	<tr>
		<!-- Modo 1 instantaneo -->
		<td
			on:click={() => {
				params.mode = "instant";
				page = "game";
			}}
		>
		<Quantity mode="basic" n="Instant"></Quantity>
		</td>
		<!-- Modo 2 disminuyendo tiempo que se muestra -->
		<td
			on:click={() => {
				params.mode = "sample time";
				page = "game";
			}}
		>
		<Quantity mode="basic" n="Sample time"></Quantity>
		</td>
		<!-- Modo 3 aumenta tiempo tapado hasta mostrar opciones -->
		<td
			on:click={() => {
				params.mode = "delay";
				page = "game";
			}}
		>
		<Quantity mode="basic" n="Delay"></Quantity>
		</td>
	</tr>
</table>

<div ALIGN="RIGHT">InCA Labs</div>
