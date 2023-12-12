<script>
  import Quantity from "./quantity.svelte";
	import { afterUpdate } from 'svelte';
	import {enterInLocalLog} from "./log.js";
	import {dateInOrgmodeFormat} from "./log.js";
	import {
		saveConfig,
		defaultConfig,
	} from "./storage.js";
	// Parameters
  export let log={}
  export let params={};
  // Variables
  let modes = ["instant", "sample time", "delay"];
  // let modes = ["dice", "heap", "rect", "disc", "randgrid", "randheap"];
  let colors = ["white", "black", "green", "yellow", "red", "blue"];
  let i = 3;
  let maxValue = 9;
  let valuesMenu = [0,1,2,3,4,5,6,7,8,9];
  let gridSizes = [3, 4, 5, 6, 7];
  let redraw = true;
	const	synth = window.speechSynthesis;

	// Functions
	function resetLogs() {
		console.log("Reseting the logs.");
		log = {
  		test_number: 0,
	  	time_last_display: 0,
		  text_diary: ["# Date Time (...) "],
		  // csv_diary: ["Test no, Test Name, Learner, Trainer, C_0, C_1, C_2, C_3, C_4, Value selected , Correction , Date, Answering Time (ms), Other Parameters"],
		  csv_diary: ["Test no, Test Name, Correction"],
			text: new Blob(["# No test was executed before saving this text log. "], {type: 'text/plain'}),
		  csv: new Blob(["# No test was executed before saving this csv log. "], {type: 'text/csv'})
		};
	}
	function test() {
		console.log("Test Function");
	}
	function fileName() {
		return dateInOrgmodeFormat()+"-InCA-BCT-"+params.learner+" trained by "+params.teacher;
	}
	function switchOffRedraw() {
    redraw = false;
	}
	function switchOnRedraw() {
    redraw = true;
	}

	function ttsTest(value) {
		const utterThis = new SpeechSynthesisUtterance(value);
		const voices = synth.getVoices();
		for (const voice of voices) {
			if (voice.lang === params.ttsLang) utterThis.voice = voice;
		}
		utterThis.pitch = params.ttsPitch;
		utterThis.rate = params.ttsRate;
		synth.speak(utterThis);
	}

	afterUpdate(() => {
		params.lastConfigSave = saveConfig(params);
		console.log('DOM Update');
	});

	if (!params.randomModes) params.randomModes = [];

	// let name = 'bazinga'
	// let description = 'quizx'
	// let active = 'True'

  async function login(){

		const body = JSON.stringify({
			username,
      password
		})


		const headers = {
		'Content-Length': body.length,
		'Content-Type': 'application/json'
		};

		const response = await fetch(params.logInEndpointUrl, {
			method: 'POST',
			headers,
			body
		});
		const data = await response.json();

		params.userToken = data.token;
		params.isLoggedIn = true;
    currentStatus = "logged In"

    console.log('Logged In '+ params.isLoggedIn)

	}


</script>

<style>
	input[type=checkbox],
	input[type=radio]
	{
    transform: scale(2);
			margin-left:30px;
			margin-right:10px;
}
	label{
	margin:10px;
	}
	input[type='text']{width:100%}
</style>

<h1 align="center">Configuration</h1>

<button on:click={() => { params = defaultConfig()}}>Default settings</button>

<h2>Logs</h2>
<!-- <input type=checkbox bind:checked={params.logInteractions}> -->
{#if params.logInteractions}
<ul>
<li><label>Learner's name: <input bind:value={params.learner} placeholder={params.learner}></label>
<li><label>Instructor's name: <input bind:value={params.teacher} placeholder={params.teacher}></label>
<!-- <button on:click={createLog} > Create New Log </button> -->
<li>DOWNLOAD the log in
	<button><a download="{fileName()}.txt" href="{URL.createObjectURL(log.text)}" id="downloadLinkTEXT">TEXT</a></button> or
  <button><a download="{fileName()}.csv" href="{URL.createObjectURL(log.csv)}" id="downloadLinkCSV">CSV</a></button> format.
<li> <button on:click={resetLogs}>RESET the log</button></li>
</ul>
	<!--
<label>
 <input type=checkbox bind:checked={params.activeServer}> Automatic log to server
  <input type='text' disabled={!params.activeServer} bind:value={params.server} placeholder={params.server}>
</label>
-->
<!--
Statistics: (<a download="stats.csv" href="{URL.createObjectURL(log.blob)}" id="downloadLink">Download local log</a>
-->
{/if}

<h2>Apparences</h2>
<table>
	<tr><td>

<h3>Mode = {params.mode}</h3>
		{#each modes as mode }
		<input type=radio bind:group={params.mode} value={mode} on:change={e => {
			if (e.target.value !== 'randgrid' && e.target.value !== 'randheap') {
				params.gridSize = 3;
			}
		}}> {mode}
		{/each}

<h3>Colors: {params.fg} on {params.bg} </h3>
<div>Foreground:
	<!--suggestion jo ? 	<input type="color"/> -->
	{#each colors as color}
	<input type=radio bind:group={params.fg} value={color}> {color}
	{/each}
</div>
<div>Background:
	{#each colors as color}
	<input type=radio bind:group={params.bg} value={color}> {color}
	{/each}
</div>
		<label>Background Opacity: {params.bg_opacity}
	<input
				 type=range
				 bind:value={params.bg_opacity}
				 min=0.01 max=0.99 step=0.01
				 on:input={switchOnRedraw}
				 >
		</label>

</td>
<td>
<h3>Example for n={params.valuesSet[params.gridSize][i]}</h3>

<label align=center>
	<input
				 type=range
				 bind:value={i}
				 min=0 max={params.valuesSet[params.gridSize].length-1}
				 on:input={switchOnRedraw}
				 >
	<center>
		{#if redraw}
	<Quantity n={params.valuesSet[params.gridSize][i]}
						gridSize={params.gridSize}
						mode={params.mode}
						fg={params.fg}
						bg={params.bg}
						bg_opacity={params.bg_opacity}
						></Quantity>
		{switchOffRedraw()}
		{:else}
	<Quantity n={params.valuesSet[params.gridSize][i]}
						gridSize={params.gridSize}
						mode={params.mode}
						fg={params.fg}
						bg={params.bg}
						bg_opacity={params.bg_opacity}
						></Quantity>
		{/if}
	</center>
</label>
</td>
</tr>
</table>

<h2>Exercises features</h2>
<label>Nb values to choose from: {params.nbChoices}
	<input type=range bind:value={params.nbChoices} min=1 max=5>
</label>
<label>Waiting Time between exercises: {params.waiting_time} seconds
	<input type=range bind:value={params.waiting_time} min=0 max=10 step=0.1>
</label>
<label>Pressing time to exit game mode: {params.durationHomeButton} seconds
	<input type=range bind:value={params.durationHomeButton} min=0 max=10 step=0.1>
</label>

<label>Sample time: {params.sampleTime / 1000} seconds
	<input type=range bind:value={params.sampleTime} min=200 max=5000 step=100>
</label>
<label>Delay time (delay mode): {params.delayTime / 1000} seconds
	<input type=range bind:value={params.delayTime} min=100 max=10000 step=100>
</label>
<label>Minimum sample time: {params.minSampleTime / 1000} seconds
	<input type=range bind:value={params.minSampleTime} min=100 max=1000 step=100>
</label>
<label>Sample time decrement (sample time mode): {params.sampleTimeDecrement / 1000} seconds
	<input type=range bind:value={params.sampleTimeDecrement} min=50 max=1000 step=100>
</label>
<label>Delay time increment (delay mode): {params.delayTimeIncrement / 1000} seconds
	<input type=range bind:value={params.delayTimeIncrement} min=100 max=1000 step=100>
</label>


<br>
<label>
	<input type=checkbox bind:checked={params.timedRedirect} on:click={(event) => {
		if (params.randomModeAfterFinish) { params.randomModeAfterFinish=false; params.timedRedirect=event.target.value }
		}}> Autoredirect to home after finish
</label>
<label>Time to redirect: {params.redirectTime} seconds
	<input type=range bind:value={params.redirectTime} disabled={!params.timedRedirect} min=0 max=10 step=0.2>
</label>
<br>
<label>
	<input type=checkbox bind:checked={params.randomModeAfterFinish} on:click={(event) => {
		if (params.timedRedirect) { params.timedRedirect=false; params.randomModeAfterFinish=event.target.value }
		}}> Random mode after finish
</label>
<label>Time to start: {params.randomModeDelay} seconds
	<input type=range bind:value={params.randomModeDelay} disabled={!params.randomModeAfterFinish} min=0 max=10 step=0.1>
</label>
{#each modes as mode}
<label style="display:inline-block">
	<input type=checkbox bind:group={params.randomModes} disabled={!params.randomModeAfterFinish} value={mode}> {mode}
</label>
{/each}

<h2><input type=checkbox bind:checked={params.visualFeedback}> Visual Feedback </h2>
<label>"Correct" visual feedback: <input disabled={!params.visualFeedback} type="text" bind:value={params.visualFeedbackCorrect} placeholder={params.visualFeedbackCorrect}></label>
<label>"Incorrect" visual feedback: <input disabled={!params.visualFeedback} type="text" bind:value={params.visualFeedbackInCorrect} placeholder={params.visualFeedbackInCorrect}></label>

<h2><input type=checkbox bind:checked={params.gameFeatures}> Games features</h2>
{#if params.gameFeatures}
<label>Ready screen <input type=checkbox bind:checked={params.readyScreen}></label>
<label>Game Length: {params.gameLength}
	<input type=range bind:value={params.gameLength} min=1 max=50>
</label>
<label>Game Threshold for Excellent: {params.gameThresholds.excel}
	<input type=range bind:value={params.gameThresholds.excel} min={params.gameThresholds.pass} max={params.gameLength}>
</label>
<label>Game Threshold for Pass: {params.gameThresholds.pass}
	<input type=range bind:value={params.gameThresholds.pass} min=1 max={params.gameThresholds.excel}>
</label>
<label>"Excellent" visual feedback: <input disabled={!(params.visualFeedback&params.gameFeatures)} type="text" bind:value={params.visualFeedbackExcellent} placeholder={params.visualFeedbackExcellent}></label>
<label>"Pass" visual feedback: <input disabled={!(params.visualFeedback&params.gameFeatures)} type="text" bind:value={params.visualFeedbackPass} placeholder={params.visualFeedbackPass}></label>
<label>"Fail" visual feedback: <input disabled={!(params.visualFeedback&params.gameFeatures)} type="text" bind:value={params.visualFeedbackFail} placeholder={params.visualFeedbackFail}></label>
{/if}

<h2><input type=checkbox bind:checked={params.playSound}> Sounds</h2>
{#if params.playSound}
<label>"Correct" Exercise sound text <input disabled={!params.playSound} type="text" placeholder={params.ttsCorrect} bind:value={params.ttsCorrect}> <button on:click={ttsTest(params.ttsCorrect)}>Test</button></label>
<label>"Incorrect" Exercise sound text <input disabled={!params.playSound} type="text" placeholder={params.ttsIncorrect} bind:value={params.ttsIncorrect}> <button on:click={ttsTest(params.ttsIncorrect)}>Test</button></label>
<label>"Fail" Exercise sound text <input disabled={!params.playSound} type="text" placeholder={params.ttsFail} bind:value={params.ttsFail}> <button on:click={ttsTest(params.ttsFail)}>Test</button></label>
<label>"Pass" Exercise sound text <input disabled={!params.playSound} type="text" placeholder={params.ttsPass} bind:value={params.ttsPass}> <button on:click={ttsTest(params.ttsPass)}>Test</button></label>
<label>"Excellent" Exercise sound text <input disabled={!params.playSound} type="text" placeholder={params.ttsExcellent} bind:value={params.ttsExcellent}> <button on:click={ttsTest(params.ttsExcellent)}>Test</button></label>
<label>"No More" Exercise sound text <input disabled={!params.playSound} type="text" placeholder={params.ttsNoMore} bind:value={params.ttsNoMore}> <button on:click={ttsTest(params.ttsNoMore)}>Test</button></label>
<label>"Ready" Exercise sound text <input disabled={!params.playSound} type="text" placeholder={params.ttsReady} bind:value={params.ttsReady}> <button on:click={ttsTest(params.ttsReady)}>Test</button></label>

{/if}

