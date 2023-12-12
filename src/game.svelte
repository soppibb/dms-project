<script>
  import Quantity from "./quantity.svelte";
  import Abstractimage from "./abstractimage.svelte";
  import { dateInOrgmodeFormat } from "./log.js";
  import Papa from "papaparse";
  // Parameters of the app:
  export let params = {};
  export let log = {};
  export let volatileParams = {};
  export let page = "";

  const synth = window.speechSynthesis;
  const voices = synth.getVoices();

  function newUtterance(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    for (const voice of voices) {
      if (voice.lang === params.ttsLang) utterance.voice = voice;
    }
    utterance.pitch = params.ttsPitch;
    utterance.rate = params.ttsRate;
    return utterance;
  }

  // Variables of the app
  let potentialChoices = [
    "img/p1.jpg",
    "img/p2.jpg",
    "img/p3.jpg",
    "img/p4.webp",
    "img/p5.avif",
    "img/p6.webp",
    "img/p7.jpg",
    "img/p8.webp",
  ];
  let correctSound = newUtterance(params.ttsCorrect);
  let incorrectSound = newUtterance(params.ttsIncorrect);
  let noMoreSound = newUtterance(params.ttsNoMore);
  let excellentSound = newUtterance(params.ttsExcellent);
  let passSound = newUtterance(params.ttsPass);
  let failSound = newUtterance(params.ttsFail);
  let readySound = newUtterance(params.ttsReady);
  let choices = [];
  let selection;
  let selected = false;
  let correct = false;
  let exerciseResult = "";
  let gameResult = "";
  let waitingForReward = false;
  let nbCorrect = 0;
  let nbIncorrect = 0;
  let gameResultText = "";

  // Abstract images game variables
  let sampleTime = params.sampleTime;
  let delayTime = params.delayTime;
  let correctAnswer = "";
  let showSample = true;
  let showChoices = false;
	let minSampleTime = params.delayTime;

  // Initializing
  reset();
  newOne();
  // Functions
  function onRoundStart() {
    if (params.mode == "sample time") {
      sampleTime -= params.sampleTimeDecrement;
			sampleTime = sampleTime < minSampleTime ? minSampleTime : sampleTime;
    } else if (params.mode == "delay") {
      delayTime += params.delayTimeIncrement;
    }
    correctAnswer =
      potentialChoices[Math.floor(Math.random() * potentialChoices.length)];
  }

  function enterInLocalLog(string) {
    //	  console.log(dateInOrgmodeFormat()+" "+string);
    log.text_diary = [
      ...log.text_diary,
      "\n" + dateInOrgmodeFormat() + " " + string,
    ];
    log.text = new Blob(log.text_diary, { type: "text/plain" });
    localStorage.setItem("log", JSON.stringify(log));
  }
  function enterInCSVLog(string) {
    log.csv_diary = [...log.csv_diary, "\n" + string];
    log.csv = new Blob(log.csv_diary, { type: "text/csv" });
    localStorage.setItem("log", JSON.stringify(log));
    console.log("ASD", log);
  }

  async function doPost(body) {
    if (params.isLoggedIn == true) {
      let test_number = log.test_number;
      console.log(params);
      const SERVER_URL = params.entryEndpointUrl;
      const headers = {
        "Content-Length": body.length,
        "Content-Type": "application/json",
        Authorization: `Token ${params.userToken}`,
      };

      const res = await fetch(SERVER_URL, {
        method: "POST",
        headers,
        body,
      });
    }
  }

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  function select(c) {
    log.test_number++;
    if (selected == false) {
      selected = true;
      selection = c;
      correct = true;
      volatileParams.ready = false;
      if (correctAnswer != selection) {
        correct = false;
      }
      var response_time = Date.now() - log.time_last_display;
      console.log("RESPONSE TIME", response_time);
      var choices_complementary = "";
      var json_complementary = "";
      if (params.nbChoices == 1) {
        var choices_complementary = ",,,,";
        var json_complementary = ["none", "none", "none", "none"];
      } else if (params.nbChoices == 2) {
        var choices_complementary = ",,,";
        var json_complementary = ["none", "none", "none"];
      } else if (params.nbChoices == 3) {
        var choices_complementary = ", , ";
        var json_complementary = ["none", "none"];
      } else if (params.nbChoices == 4) {
        var choices_complementary = ", ";
        var json_complementary = ["none"];
      } else if (params.nbChoices == 5) {
        var choices_complementary = "";
        var json_complementary = [];
      }
      //	csv_diary: ["Test no, Test Name, Learner, Trainer, C_0, C_1, C_2, C_3, C_4, Clicked , Correction , Date, Answering Time, Other Parameters"],
      const columns = [
        log.test_number,
        params.mode,
        // params.learner,
        // params.teacher,
        // ...(choices + choices_complementary).split(","),
        // c,
        correct,
        // dateInOrgmodeFormat(),
        // response_time,
        // `background ${params.bg} - foreground ${params.fg}`,
        // `bg opacity ${params.bg_opacity}`,
        // `Value Set ${params.valuesSet[params.gridSize].sort()}`,
      ];
      console.log("PAPA", Papa.unparse([columns]));
      console.log("CHOICES", choices);
      const choices_list = [...choices, ...json_complementary];
      console.log("CHOICES_LIST", choices_list);
      const trainer = params.teacher;
      const subject = params.learner;
      const result = correct;
      const rt_json = `${response_time}`;

      const c0 = choices_list[0].toString();
      const c1 = choices_list[1].toString();
      const c2 = choices_list[2].toString();
      const c3 = choices_list[3].toString();
      const c4 = choices_list[4].toString();
      const test_name = params.mode;

      var hour = new Date().toLocaleTimeString();

      const app_name = "Inca- Test";
      const other =
        `background ${params.bg} - foreground ${params.fg}` +
        `bg opacity ${params.bg_opacity}` +
        `Value Set ${params.valuesSet[params.gridSize].sort()}`;

      const body = JSON.stringify({
        hour,
        c0,
        c1,
        c2,
        c3,
        c4,
        test_name,
        result,
        log: params.logId,
        response_time: rt_json,
        other,
      });

      doPost(body);

      enterInCSVLog(Papa.unparse([columns]));
      // enterInCSVLog(log.test_number+", "+params.mode+", "+params.learner+", "+params.teacher+", "+choices+choices_complementary+", "+c+","+correct+", "+dateInOrgmodeFormat()+", "+response_time+", background "+params.bg+" - foreground "+params.fg+", bg opacity "+params.bg_opacity+", Value Set ["+params.valuesSet[params.gridSize].sort()+"]");
      if (correct == true) {
        nbCorrect++;
        if (params.visualFeedback) {
          exerciseResult = params.visualFeedbackCorrect;
        }
        if (params.playSound) {
          if (nbCorrect + nbIncorrect <= params.gameLength) {
            synth.speak(correctSound);
          }
        }
        enterInLocalLog(
          params.learner +
            " chose correctly " +
            c +
            " out of " +
            choices +
            " in mode '" +
            params.mode +
            "' with " +
            params.fg +
            " stuff on " +
            params.bg +
            " background."
        );
      } else {
        nbIncorrect++;
        if (params.visualFeedback) {
          exerciseResult = params.visualFeedbackInCorrect;
        }
        if (params.playSound) {
          if (nbCorrect + nbIncorrect <= params.gameLength) {
            synth.speak(incorrectSound);
          }
        }
        enterInLocalLog(
          params.learner +
            " chose INcorrectly " +
            c +
            " out of " +
            choices +
            " in mode '" +
            params.mode +
            "' with " +
            params.fg +
            " stuff on " +
            params.bg +
            " background."
        );
      }
      if (params.gameFeatures) {
        if (nbCorrect + nbIncorrect >= params.gameLength) {
          enterInLocalLog(
            params.learner +
              " finished a game: " +
              nbCorrect +
              " correct answers and " +
              nbIncorrect +
              " incorrect answers."
          );
          if (nbCorrect >= params.gameThresholds.excel * params.gameLength) {
            if (params.playSound) {
              setTimeout(
                synth.speak(excellentSound),
                params.gameWaitingTimeForResultInMiliseconds
              );
            }
            if (params.visualFeedback) {
              gameResult = params.visualFeedbackExcellent;
            }
            console.log("Excellent");
          } else if (
            nbCorrect >=
            params.gameThresholds.pass * params.gameLength
          ) {
            if (params.playSound) {
              setTimeout(
                synth.speak(passSound),
                params.gameWaitingTimeForResultInMiliseconds
              );
            }
            if (params.visualFeedback) {
              gameResult = params.visualFeedbackPass;
            }
            console.log("Pass");
          } else {
            if (params.playSound) {
              setTimeout(
                synth.speak(failSound),
                params.gameWaitingTimeForResultInMiliseconds
              );
            }
            if (params.visualFeedback) {
              gameResult = params.visualFeedbackFail;
            }
            console.log("Fail");
          }
          waitingForReward = true;
          if (params.timedRedirect) {
            setTimeout(() => {
              page = "home";
            }, params.redirectTime * 1000);
          } else if (params.randomModeAfterFinish) {
            params.mode =
              params.randomModes[
                Math.floor(Math.random() * params.randomModes.length)
              ];
            setTimeout(() => {
              reset();
            }, params.randomModeDelay * 1000);
          }
        }
      }
      if (!waitingForReward) {
        setTimeout(() => {
          volatileParams.readyScreen = true;
          newOne();
        }, params.waiting_time * 1000);
      }
    }
  }
  function reset() {
    nbCorrect = 0;
    nbIncorrect = 0;
    gameResult = "";
    volatileParams.readyScreen = true;
    volatileParams.ready = false;
    selected = false;
    correct = false;
    exerciseResult = "";
    gameResult = "";
    waitingForReward = false;
    nbCorrect = 0;
    nbIncorrect = 0;
    gameResultText = "";
  }

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  function newOne() {
		choices = [];
    onRoundStart();
    // Generates a random pair of distinct integers from [1..{maxNumber}]
    var i, r;
    for (i = 0; i < params.nbChoices; i++) {
      r = Math.floor(
        Math.random() * (params.valuesSet[params.gridSize].length - i)
      );
      [
        params.valuesSet[params.gridSize][i],
        params.valuesSet[params.gridSize][i + r],
      ] = [
        params.valuesSet[params.gridSize][i + r],
        params.valuesSet[params.gridSize][i],
      ]; // swap the two values
    }
		choices.push(correctAnswer);
		let possibleChoices = JSON.parse(JSON.stringify(potentialChoices));
		possibleChoices.splice(possibleChoices.indexOf(correctAnswer), 1);
		for (let i = 0; i < params.nbChoices - 1; i++) {
			const chosen = possibleChoices[Math.floor(Math.random() * possibleChoices.length)]
			choices.push(chosen);
			possibleChoices.splice(possibleChoices.indexOf(chosen), 1);
		}
		shuffle(choices);
    // choices = potentialChoices.slice(0, params.nbChoices);
    selected = false;
    correct = false;
    exerciseResult = "";
    volatileParams.readyScreen = true;
    if (params.playSound && volatileParams.readyScreen) synth.speak(readySound);
  }

  function manageSample() {
    if (params.mode == "instant") {
      showSample = true;
      showChoices = false;
      setTimeout(() => {
        showChoices = true;
        showSample = false;
      }, sampleTime);
    } else if (params.mode == "sample time") {
      showSample = true;
      showChoices = false;
      setTimeout(() => {
        showChoices = true;
        showSample = false;
      }, sampleTime);
    } else if (params.mode == "delay") {
      showSample = true;
      showChoices = false;
      setTimeout(() => {
        showSample = false;
        setTimeout(() => {
          showChoices = true;
        }, delayTime);
      }, sampleTime);
    }
  }
</script>

{#if waitingForReward}
  <center>
    <!-- <button on:click="{() => {waitingForReward=false;reset();newOne()}}" class="for_birds">Play again?</button>
 -->
    {#if params.visualFeedback}
      <center>{@html exerciseResult}</center>
      <center>{@html gameResult}</center>
    {/if}
  </center>
{:else}
  <h1 align="center">TEST</h1>

  {#if !selected}
    {#if !volatileParams.readyScreen && volatileParams.ready}
      <div align="center" use:manageSample class="sample">
        <Abstractimage source={correctAnswer} active={showSample}
        ></Abstractimage>
      </div>
      <div style="--nbChoices: {params.nbChoices}">
        {#each choices as c}
          <span on:click={() => select(c)}>
            <Abstractimage source={c} active={showChoices}></Abstractimage>
          </span>
        {/each}
      </div>
    {/if}
  {:else if params.visualFeedback}
    <center>{@html exerciseResult}</center>
    <center>{@html gameResult}</center>
  {/if}
  {#if params.noMoreBotton}
    <button
      on:click={() => {
        synth.speak(noMoreSound);
      }}>No more</button
    >
  {/if}
{/if}

<center
  >(+{nbCorrect},-{nbIncorrect}) {#if params.gameFeatures}
    among {params.gameLength}{/if}</center
>

<style>
  span {
    margin-left: calc(
      (90vw - var(--nbChoices) * 160px) / (var(--nbChoices) + 1)
    );
  }

  * {
    -webkit-user-select: none; /* Chrome all / Safari all */
    -moz-user-select: none; /* Firefox all */
    -ms-user-select: none; /* IE 10+ */
    user-select: none; /* Likely future */
  }

  .sample {
    margin-bottom: 40px;
  }

  /*
	table{width:100%}
	td {
  text-align: center;
		border:1px solid black;
	}
	*/
  /* peut etre a creuser :
	https://developer.mozilla.org/fr/docs/Web/CSS/justify-content
	mais si on souhaiter calculer les espaces il faudrait imp�rativement connaitre la "largeur" de quantity
	*/

  /*
	td {
    padding-left: 100px;
    padding-right: 0px;
  }
  td:first-child {
    padding-left: 0;
  }
  td:last-child {
    padding-right: 0;
  }*/
</style>
