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

    /* ☕ BREAKFAST */

    breakfast: {

        name: "Breakfast Time ☕",

        className: "theme-breakfast",

        background:
            "assets/backgrounds/breakfast.png",

        cat:
            "assets/cats/breakfast.png",

        start:
            6 * 60,

        end:
            9 * 60 + 29
    },


    /* 🧹 CLEANING */

    cleaning: {

        name: "Cleaning Time 🧹",

        className: "theme-cleaning",

        background:
            "assets/backgrounds/cleaning.png",

        cat:
            "assets/cats/cleaning.png",

        start:
            9 * 60 + 30,

        end:
            11 * 60 + 29
    },


    /* 📚 STUDY */

    study: {

        name: "Study Time 📚",

        className: "theme-study",

        background:
            "assets/backgrounds/study.png",

        cat:
            "assets/cats/study.png",

        start:
            11 * 60 + 30,

        end:
            15 * 60 + 59
    },


    /* 📺 TV */

    tv: {

        name: "TV Time 📺",

        className: "theme-tv",

        background:
            "assets/backgrounds/tv.png",

        cat:
            "assets/cats/tv.png",

        start:
            16 * 60,

        end:
            18 * 60 + 59
    },


    /* 🍽️ DINNER */

    dinner: {

        name: "Dinner Time 🍽️",

        className: "theme-dinner",

        background:
            "assets/backgrounds/dinner.png",

        cat:
            "assets/cats/dinner.png",

        start:
            19 * 60,

        end:
            21 * 60 + 29
    },


    /* 🌙 SLEEPY */

    sleepy: {

        name: "Sleepy Time 🌙",

        className: "theme-sleepy",

        background:
            "assets/backgrounds/sleepy.png",

        cat:
            "assets/cats/sleepy.png",

        start:
            21 * 60 + 30,

        end:
            23 * 60 + 59
    },


    /* 🌙 AFTER MIDNIGHT */

    night: {

        name: "Dreamy Night 🌙",

        className: "theme-sleepy",

        background:
            "assets/backgrounds/sleepy.png",

        cat:
            "assets/cats/sleepy.png",

        start:
            0,

        end:
            5 * 60 + 59
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
   PLAY TWINNG SOUND
========================================= */

function playThemeSound() {

    /* Sound OFF? Stop here. */

    if (!soundEnabled) {

        return;
    }


    /* Start sound from beginning */

    themeSound.currentTime = 0;


    /*
       Play the cute TWINNG sound.

       Some browsers block automatic
       audio until the user interacts
       with the page, so we safely catch
       that situation.
    */

    themeSound
        .play()
        .catch(() => {

            console.log(
                "Sound will play after user interaction."
            );

        });
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