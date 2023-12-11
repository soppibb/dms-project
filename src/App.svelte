<script>
	// Local variables
	let pressed = false;
	// Imports
	import Home from "./home.svelte";
	import W3Menu from "./w3menu.svelte";
	import Game from "./game.svelte";
	import Config from "./config.svelte";
	import Info from "./info.svelte";
	import LogIn from "./login.svelte";
	import {longpress} from "./longpress.js";
	import {
		saveConfig,
		loadConfig,
		defaultConfig,
	} from "./storage";
	// External Variables
	export let page = "menu";
	export let log ={
		test_number: 0,
		time_last_display: 0,
		text_diary: ["# Date Time (...) "],
		csv_diary: ["Test no, Test Name, Learner, Trainer, C_0, C_1, C_2, C_3, C_4, Value selected , Correction , Date, Answering Time (ms), Other Parameters"],
		text: new Blob(["# No test was executed before saving this text log. "], {type: 'text/plain'}),
		csv: new Blob(["# No test was executed before saving this csv log. "], {type: 'text/csv'})
	}
  export let params = loadConfig() || defaultConfig();
	export let volatileParams = {
		ready: false,
		readyScreen: true,
		showReadyButton: true,
	};
	// Initializing
	loadFromLocalStorage();
	// Functions
	function loadFromLocalStorage() {
		const storedLog = localStorage.getItem('log');
		if (storedLog) {
			log = JSON.parse(storedLog);
			log.text = new Blob(log.text_diary, {type: 'text/plain'});
			log.csv = new Blob(log.csv_diary, {type: 'text/csv'});
			// console.log('Log loaded from browser storage', log);
		}
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
</svelte:head>


{#if page == "game"}
<div class="navbar">
	<button use:longpress={0}
		on:longpress="{() => {pressed = true; page="home";}}"
		on:mouseenter="{() => pressed = false}"
		class = for_birds
	>Exit</button>
	{#if volatileParams.readyScreen && !volatileParams.ready}
		<button on:click="{() => {
			volatileParams.readyScreen = false;
			volatileParams.ready = true;
			log.time_last_display = Date.now();
		}}" class="for_birds">Ready</button>
	{/if}
	<div></div>
</div>
{:else}
<W3Menu bind:page={page} />
{/if}

{#if page == "config"} <Config bind:params bind:log></Config>
{:else if page == "game"} <Game bind:params bind:log bind:volatileParams bind:page></Game>
{:else if page == "info"} <Info></Info>
{:else if page == "login"} <LogIn bind:params></LogIn>
{:else} <Home bind:params bind:page></Home>
{/if}

<div align=right>
<button use:longpress={params.durationHomeButton*1000}
	on:longpress="{() => {pressed = true; page="config";}}"
	on:mouseenter="{() => pressed = false}"
				class="for_humans"
>Settings</button>
{#if params.durationHomeButton>0}
(Press {params.durationHomeButton}s)
{/if}
</div>

<style>

.navbar {
	display: flex;
	justify-content: space-between;
	padding-right: 100px;
}

.for_birds {
  display: inline-block;
  width: 100px;
  height: 100px;
  text-align: center;
  border: gray;
  background-color: #E8562A;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
}

.for_humans {
  text-align: center;
}
	:global(body){
		 margin:0px;
	 	 padding:0px;
	}
</style>
