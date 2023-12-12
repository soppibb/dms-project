export function saveConfig(params) {
    params.lastConfigSave = new Date().toLocaleString();
    localStorage.setItem('params', JSON.stringify(params));
    console.log('SAVE CONFIG')
    return params.lastConfigSave;
}

export function loadConfig() {
    const configJSON = localStorage.getItem('params');
    if (configJSON) {
        const config = JSON.parse(configJSON)
        if (config.version !== 0.1) return null;
        if (!config.valuesSet) {
            config.valuesSet = {
                3: [1, 2, 3, 4, 5, 6],
                4: [1, 2, 3, 4, 5, 6],
                5: [1, 2, 3, 4, 5, 6],
                6: [1, 2, 3, 4, 5, 6],
                7: [1, 2, 3, 4, 5, 6],
            };
        }
        return config;
    } else return null;
}

export function defaultConfig() {
    return {
        logId: 0,
        isLoggedIn: false,
        logInEndpointUrl: "http://127.0.0.1:8000/account/login/",
        entryEndpointUrl: "http://127.0.0.1:8000/logs/entries/",
        logCreateEndpointUrl: "http://127.0.0.1:8000/logs/",
        logOutEndpointUrl: "http://127.0.0.1:8000/account/logout/",
        userToken: "",
        version: 0.1,
        waiting_time: 1,
        durationHomeButton: 3,
        noMoreBotton: false,
        noMoreSoundURL: "",
        mode: 'instant',
        randomMode: false,
        randomModes: false,
        modes: ["dice", "heap"],
        randomColors: false,
        colors: ["black", "red", "blue"],
        randomOpacity: false,
        opacities: [.2, .3, .5, .7, .9],
        nbChoices: 4,
        bg: "black",
        fg: "green",
        bg_opacity: ".2",
        values: [1, 2, 3, 4, 5, 6],
        playSound: true,
        visualFeedback: false,
        visualFeedbackCorrect: '<h1 style="font-size:10vw; color:green; background-color: grey;">CORRECT!</h1>',
        visualFeedbackInCorrect: '<h1 style="font-size:10vw; color:red; background-color: grey;">INCORRECT!</h1>',
        correctSoundURL: "https://buho.dcc.uchile.cl/~inca-bat/sounds/correct.mp3",
        incorrectSoundURL: "https://buho.dcc.uchile.cl/~inca-bat/sounds/incorrect.mp3",
        gameFeatures: true,
        gameLength: 10,
        gameThresholds: { pass: .5, excel: .9 },
        gameSoundsURLs: {
            fail: "https://buho.dcc.uchile.cl/~inca-bat/sounds/tryagain.mp3",
            pass: "https://buho.dcc.uchile.cl/~inca-bat/sounds/welldone.mp3",
            excel: "https://buho.dcc.uchile.cl/~inca-bat/sounds/excellent.mp3"
        },
        gameWaitingTimeForResultInMiliseconds: 2000,
        visualFeedbackFail: '<h1 style="font-size:10vw; color:red; background-color: grey;">FAIL!</h1>',
        visualFeedbackPass: '<h1 style="font-size:10vw; color:blue; background-color: grey;">PASS!</h1>',
        visualFeedbackExcellent: '<h1 style="font-size:10vw; color:green; background-color: grey;">EXCELLENT!</h1>',
        logInteractions: true,
        server: "https://buho.dcc.uchile.cl/~inca-bct/log.php",
        activeServer: false,
        learner: "Lorenzo",
        teacher: "Jeremy",
        ttsLang: "en-US",
        ttsRate: 1,
        ttsPitch: 1,
        ttsCorrect: "Correct",
        ttsIncorrect: "Incorrect",
        ttsNoMore: "No more",
        ttsFail: "Fail",
        ttsPass: "Pass",
        ttsExcellent: "Excellent",
        ttsReady: "Ready?",
        readyScreen: true,
        lastConfigSave: 'No config saved.',
        timedRedirect: false,
        redirectTime: 5,
        randomModeAfterFinish: false,
        randomModes: [],
        randomModeDelay: 2,
        sampleTime: 1000,
        delayTime: 1000,
        minSampleTime: 250,
        sampleTimeDecrement: 100,
        delayTimeIncrement: 100,
        gridSize: 3,
        valuesSet: {
            3: [1, 2, 3, 4, 5, 6],
            // 4: [1, 2, 3, 4, 5, 6],
            // 5: [1, 2, 3, 4, 5, 6],
            // 6: [1, 2, 3, 4, 5, 6],
            // 7: [1, 2, 3, 4, 5, 6],
        },

    }
}