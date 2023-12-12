<script>
    import {
        saveConfig,
        defaultConfig,
    } from "./storage.js";
    import { afterUpdate } from 'svelte';
    // Parameters
  export let params={};
  let username = "";
  let password = "";

    afterUpdate(() => {
        params.lastConfigSave = saveConfig(params);
        console.log("DOM Update");
    });

    if (!params.randomModes) params.randomModes = [];

    function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

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

        console.log('Logged In '+ params.isLoggedIn)

        let date = formatDate(new Date())
        let subject = params.learner
        let laboratory = 'IncaLab'
        let app_name = 'Inca What Is More'

        const body2 =  JSON.stringify({
            date,
            subject,
            laboratory,
            app_name,
        })

        const headers2 = {
        'Content-Length': body2.length,
        'Content-Type': 'application/json',
        'Authorization': `Token ${params.userToken}`,
        };

        const response2 = await fetch(params.logCreateEndpointUrl, {
            method: 'POST',
            headers: headers2,
            body: body2
        });

        const data2= await response2.json();
        params.logId = data2.id
        console.log("Created Log")

    }
async function logOut(){



        const headers = {
        'Authorization': `Token ${params.userToken}`,
        };

        const response = await fetch(params.logOutEndpointUrl, {
            method: 'POST',
            headers,
        });

        params.userToken = "";
        params.isLoggedIn = false;

        console.log('Logged out '+ params.isLoggedIn)
        console.log('User Token ' + params.userToken)

        }


</script>

<style>
  main {
        font-family: 'Muli', sans-serif;
        display: flex;
        justify-content: center;
        height: 100vh;
        overflow: hidden;
        margin: 0;
    }
</style>

<h1 align="center">Configuration</h1>

<h2 align="center">Backend Config</h2>
<!-- <li><label>Learner's name: <input bind:value={username} placeholder={'Username'}></label>
<li><label>Instructor's name: <input bind:value={password} placeholder={'Password'}></label>
<li> <button on:click={login}>Log In</button></li> -->
<main>
    <div class="container">
<form on:submit|preventDefault={login}>
    <label>Username: <input bind:value={username} placeholder={'Username'}></label>
  <label>Password: <input type="password" bind:value={password} placeholder={'Password'}></label>
    <button type="submit">
        Log In
    </button>
</form>
<h5>You are {params.isLoggedIn ? 'loged in!' : 'not logged in.'}</h5>
<button on:click={logOut}>
    Log Out
</button>


</div>
</main>
