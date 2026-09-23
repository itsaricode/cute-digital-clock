/* =========================================
   GET HTML ELEMENTS
========================================= */

const clock = document.getElementById("clock");

const cat = document.getElementById("cat");

const themeLabel =
    document.getElementById("themeLabel");

const timeElement =
    document.getElementById("time");

const ampmElement =
    document.getElementById("ampm");

const dateElement =
    document.getElementById("date");

const themeSound =
    document.getElementById("themeSound");

const soundButton =
    document.getElementById("soundButton");


/* =========================================
   SOUND SETTING
========================================= */

let soundEnabled = true;


/* =========================================
   REMEMBER CURRENT THEME
========================================= */

let currentTheme = null;


/* =========================================
   🎬 VIDEO TEST — 30 SECONDS EACH
   START: 8:45 PM
========================================= */

const themes = {

    breakfast: {

        name: "Breakfast Time ☕",
        className: "theme-breakfast",

        background:
            "assets/backgrounds/breakfast.png",

        cat:
            "assets/cats/breakfast.png",

        start: 20 * 3600 + 45 * 60,
        end:   20 * 3600 + 45 * 60 + 29
    },


    cleaning: {

        name: "Cleaning Time 🧹",
        className: "theme-cleaning",

        background:
            "assets/backgrounds/cleaning.png",

        cat:
            "assets/cats/cleaning.png",

        start: 20 * 3600 + 45 * 60 + 30,
        end:   20 * 3600 + 45 * 60 + 59
    },


    study: {

        name: "Study Time 📚",
        className: "theme-study",

        background:
            "assets/backgrounds/study.png",

        cat:
            "assets/cats/study.png",

        start: 20 * 3600 + 46 * 60,
        end:   20 * 3600 + 46 * 60 + 29
    },


    tv: {

        name: "TV Time 📺",
        className: "theme-tv",

        background:
            "assets/backgrounds/tv.png",

        cat:
            "assets/cats/tv.png",

        start: 20 * 3600 + 46 * 60 + 30,
        end:   20 * 3600 + 46 * 60 + 59
    },


    dinner: {

        name: "Dinner Time 🍽️",
        className: "theme-dinner",

        background:
            "assets/backgrounds/dinner.png",

        cat:
            "assets/cats/dinner.png",

        start: 20 * 3600 + 47 * 60,
        end:   20 * 3600 + 47 * 60 + 29
    },


    sleepy: {

        name: "Sleepy Time 🌙",
        className: "theme-sleepy",

        background:
            "assets/backgrounds/late-night.png",

        cat:
            "assets/cats/sleepy.png",

        start: 20 * 3600 + 47 * 60 + 30,
        end:   20 * 3600 + 47 * 60 + 59
    },


    night: {

        name: "Dreamy Night 🌙",
        className: "theme-sleepy",

        background:
            "assets/backgrounds/late-night.png",

        cat:
            "assets/cats/sleepy.png",

        start: 20 * 3600 + 48 * 60,
        end:   20 * 3600 + 48 * 60 + 29
    }

};


/* =========================================
   FIND THEME FROM CURRENT TIME
========================================= */

function getTheme(hour, minute) {

    const totalMinutes =
        hour * 60 + minute;


    for (
        const [key, theme]
        of Object.entries(themes)
    ) {

        if (
            totalMinutes >= theme.start &&
            totalMinutes <= theme.end
        ) {

            return {

                key: key,

                ...theme

            };
        }
    }


    /* Fallback */

    return {

        key: "night",

        ...themes.night

    };
}

/* =========================================
   CREATE CUTE TWINNG SOUND WITH JAVASCRIPT
========================================= */

let audioContext = null;


function playThemeSound() {

    if (!soundEnabled) {
        return;
    }


    /* Create AudioContext */

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

    }


    /* Resume audio if browser paused it */

    if (
        audioContext.state === "suspended"
    ) {

        audioContext.resume();
    }


    /* =====================================
       FIRST TONE
    ===================================== */

    const oscillator1 =
        audioContext.createOscillator();


    const gain1 =
        audioContext.createGain();


    oscillator1.type =
        "sine";


    oscillator1.frequency.setValueAtTime(
        700,
        audioContext.currentTime
    );


    oscillator1.frequency.exponentialRampToValueAtTime(
        1100,
        audioContext.currentTime + 0.12
    );


    gain1.gain.setValueAtTime(
        0.0001,
        audioContext.currentTime
    );


    gain1.gain.exponentialRampToValueAtTime(
        0.35,
        audioContext.currentTime + 0.02
    );


    gain1.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + 0.25
    );


    oscillator1.connect(gain1);

    gain1.connect(
        audioContext.destination
    );


    oscillator1.start();

    oscillator1.stop(
        audioContext.currentTime + 0.25
    );


    /* =====================================
       SECOND LITTLE TWINNG
    ===================================== */

    const oscillator2 =
        audioContext.createOscillator();


    const gain2 =
        audioContext.createGain();


    oscillator2.type =
        "sine";


    oscillator2.frequency.setValueAtTime(
        1100,
        audioContext.currentTime + 0.08
    );


    oscillator2.frequency.exponentialRampToValueAtTime(
        1500,
        audioContext.currentTime + 0.18
    );


    gain2.gain.setValueAtTime(
        0.0001,
        audioContext.currentTime + 0.08
    );


    gain2.gain.exponentialRampToValueAtTime(
        0.25,
        audioContext.currentTime + 0.10
    );


    gain2.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + 0.30
    );


    oscillator2.connect(gain2);

    gain2.connect(
        audioContext.destination
    );


    oscillator2.start(
        audioContext.currentTime + 0.08
    );


    oscillator2.stop(
        audioContext.currentTime + 0.30
    );
}

/* =========================================
   CHANGE THEME
========================================= */

function changeTheme(
    theme,
    playSound = false
) {


    /* =====================================
       CHANGE CLOCK THEME CLASS
    ===================================== */

    clock.className =
        `clock ${theme.className}`;


    /* =====================================
       CHANGE CANVA BACKGROUND
    ===================================== */

    clock.style.backgroundImage =
        `url("${theme.background}")`;


    clock.style.backgroundSize =
        "cover";


    clock.style.backgroundPosition =
        "center";


    clock.style.backgroundRepeat =
        "no-repeat";


    /* =====================================
       CHANGE THEME LABEL
    ===================================== */

    themeLabel.textContent =
        theme.name;


    /* =====================================
       RESTART CAT ANIMATION
    ===================================== */

    cat.classList.remove(
        "cat-enter"
    );


    /*
       Force browser to restart
       the animation.
    */

    void cat.offsetWidth;


    /* =====================================
       CHANGE CAT IMAGE
    ===================================== */

    cat.src =
        theme.cat;


    /* =====================================
       START CAT ENTRANCE ANIMATION
    ===================================== */

    cat.classList.add(
        "cat-enter"
    );


    /* =====================================
       PLAY TWINNG SOUND
    ===================================== */

    if (playSound) {

        playThemeSound();
    }
}


/* =========================================
   UPDATE CLOCK
========================================= */

function updateClock() {

    /* Get current date & time */

    const now =
        new Date();


    /* Current hour in 24-hour format */

    const hour24 =
        now.getHours();


    /* Current minute */

    const minute =
        now.getMinutes();


    /* =====================================
       CONVERT 24H → 12H
    ===================================== */

    let hour12 =
        hour24 % 12 || 12;


    /* AM or PM */

    const ampm =
        hour24 >= 12
            ? "PM"
            : "AM";


    /* =====================================
       DISPLAY TIME
    ===================================== */

    timeElement.textContent =
        `${String(hour12).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;


    /* =====================================
       DISPLAY AM / PM
    ===================================== */

    ampmElement.textContent =
        ampm;


    /* =====================================
       DISPLAY DATE
    ===================================== */

    dateElement.textContent =
        now.toLocaleDateString(
            "en-US",
            {
                weekday: "long",

                month: "long",

                day: "numeric"
            }
        );


    /* =====================================
       FIND CURRENT THEME
    ===================================== */

    const theme =
        getTheme(
            hour24,
            minute
        );


    /* =====================================
       ONLY CHANGE THEME WHEN NECESSARY
    ===================================== */

    if (
        theme.key !== currentTheme
    ) {


        /*
           First page load should NOT
           play TWINNG.

           TWINNG should only happen
           when the theme actually changes.
        */

        const firstLoad =
            currentTheme === null;


        /* Remember current theme */

        currentTheme =
            theme.key;


        /* Apply theme */

        changeTheme(

            theme,

            !firstLoad

        );
    }
}


/* =========================================
   SOUND ON / OFF BUTTON
========================================= */

soundButton.addEventListener(
    "click",
    () => {


        /* Toggle sound */

        soundEnabled =
            !soundEnabled;


        /* =================================
           SOUND ON
        ================================= */

        if (soundEnabled) {

            soundButton.textContent =
                "🔔 Sound ON";

        }


        /* =================================
           SOUND OFF
        ================================= */

        else {

            soundButton.textContent =
                "🔇 Sound OFF";

        }

    }
);


/* =========================================
   START CLOCK
========================================= */

updateClock();


/* =========================================
   UPDATE EVERY SECOND
========================================= */

setInterval(
    updateClock,
    1000
);