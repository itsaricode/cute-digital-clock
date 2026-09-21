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
   OUR THEMES
========================================= */

const themes = {

    breakfast: {

        name: "Breakfast Time ☕",

        className: "theme-breakfast",

        cat:
            "assets/cats/breakfast.png",

        start: 6 * 60,

        end:
            9 * 60 + 29
    },


    cleaning: {

        name: "Cleaning Time 🧹",

        className: "theme-cleaning",

        cat:
            "assets/cats/cleaning.png",

        start:
            9 * 60 + 30,

        end:
            11 * 60 + 29
    },


    study: {

        name: "Study Time 📚",

        className: "theme-study",

        cat:
            "assets/cats/study.png",

        start:
            11 * 60 + 30,

        end:
            15 * 60 + 59
    },


    tv: {

        name: "TV Time 📺",

        className: "theme-tv",

        cat:
            "assets/cats/tv.png",

        start:
            16 * 60,

        end:
            18 * 60 + 59
    },


    dinner: {

        name: "Dinner Time 🍽️",

        className: "theme-dinner",

        cat:
            "assets/cats/dinner.png",

        start:
            19 * 60,

        end:
            21 * 60 + 29
    },


    sleepy: {

        name: "Sleepy Time 🌙",

        className: "theme-sleepy",

        cat:
            "assets/cats/sleepy.png",

        start:
            21 * 60 + 30,

        end:
            23 * 60 + 59
    },


    night: {

        name: "Dreamy Night 🌙",

        className: "theme-sleepy",

        cat:
            "assets/cats/sleepy.png",

        start: 0,

        end:
            5 * 60 + 59
    }
};


/* =========================================
   FIND THEME FROM TIME
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


    return {
        key: "night",
        ...themes.night
    };
}


/* =========================================
   PLAY TWINNG SOUND
========================================= */

function playThemeSound() {

    if (!soundEnabled) {

        return;
    }


    themeSound.currentTime = 0;


    themeSound
        .play()
        .catch(() => {

            /*
              Browser can block sound
              until user interacts with page.
            */

        });
}


/* =========================================
   CHANGE THEME
========================================= */

function changeTheme(
    theme,
    playSound = false
) {

    /* Change clock colour */

    clock.className =
        `clock ${theme.className}`;


    /* Change label */

    themeLabel.textContent =
        theme.name;


    /* Restart entrance animation */

    cat.classList.remove(
        "cat-enter"
    );


    /*
      Force browser to notice that
      animation is starting again.
    */

    void cat.offsetWidth;


    /* Change cat */

    cat.src =
        theme.cat;


    /* Play entrance animation */

    cat.classList.add(
        "cat-enter"
    );


    /* Play sound */

    if (playSound) {

        playThemeSound();
    }
}


/* =========================================
   UPDATE CLOCK
========================================= */

function updateClock() {

    const now =
        new Date();


    const hour24 =
        now.getHours();


    const minute =
        now.getMinutes();


    /* 24h → 12h */

    let hour12 =
        hour24 % 12 || 12;


    const ampm =
        hour24 >= 12
            ? "PM"
            : "AM";


    /* Display time */

    timeElement.textContent =
        `${String(hour12).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;


    /* Display AM / PM */

    ampmElement.textContent =
        ampm;


    /* Display date */

    dateElement.textContent =
        now.toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                month: "long",
                day: "numeric"
            }
        );


    /* Find current theme */

    const theme =
        getTheme(
            hour24,
            minute
        );


    /*
      Only change theme when
      the theme actually changes.
    */

    if (
        theme.key !== currentTheme
    ) {

        const firstLoad =
            currentTheme === null;


        currentTheme =
            theme.key;


        changeTheme(
            theme,

            !firstLoad
        );
    }
}


/* =========================================
   SOUND ON / OFF
========================================= */

soundButton.addEventListener(
    "click",
    () => {

        soundEnabled =
            !soundEnabled;


        if (soundEnabled) {

            soundButton.textContent =
                "🔔 Sound ON";

        } else {

            soundButton.textContent =
                "🔇 Sound OFF";
        }
    }
);


/* =========================================
   START CLOCK
========================================= */

updateClock();


/*
  Update every second.
*/

setInterval(
    updateClock,
    1000
);