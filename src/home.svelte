<script>
	import Abstractimage from "./abstractimage.svelte";
	export let page = "home";
	export let params = {};
	const srcs = ["img/p1.jpg", "img/p2.jpg", "img/p3.jpg", "img/p4.webp", "img/p5.avif", "img/p6.webp", "img/p7.jpg", "img/p8.webp"];
	let possibleSources = ["img/p1.jpg", "img/p2.jpg", "img/p3.jpg", "img/p4.webp", "img/p5.avif", "img/p6.webp", "img/p7.jpg", "img/p8.webp"];
	let mode1 = possibleSources[Math.floor(Math.random() * possibleSources.length)];
	possibleSources.splice(possibleSources.indexOf(mode1), 1);
	let mode2 = possibleSources[Math.floor(Math.random() * possibleSources.length)];
	possibleSources.splice(possibleSources.indexOf(mode2), 1);
	let mode3 = possibleSources[Math.floor(Math.random() * possibleSources.length)];
</script>

<h1 align="center">InCA - Test</h1>

<h5 align="center">
	A simple multiple choice test example for a backend connection.
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
		<Abstractimage source={mode1}></Abstractimage>
		</td>
		<!-- Modo 2 disminuyendo tiempo que se muestra -->
		<td
			on:click={() => {
				params.mode = "diminishing";
				page = "game";
			}}
		>
		<Abstractimage source={mode2}></Abstractimage>
		</td>
		<!-- Modo 3 aumenta tiempo tapado hasta mostrar opciones -->
		<td
			on:click={() => {
				params.mode = "delaying";
				page = "game";
			}}
		>
		<Abstractimage source={mode3}></Abstractimage>
		</td>
	</tr>
</table>

<div ALIGN="RIGHT">InCA Labs</div>
