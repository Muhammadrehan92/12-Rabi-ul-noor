document.addEventListener("DOMContentLoaded", function(){

    // ==========================================
    // 1. COUNTDOWN TIMER LOGIC
    // ==========================================
    const daysElement = document.querySelector(".days");
    const hoursElement = document.querySelector(".hours");
    const minutesElement = document.querySelector(".minutes");
    const secondsElement = document.querySelector(".seconds");

    // Target date for 12 Rabi-ul-Awwal / Rabi-ul-Noor
    const countdownDate = new Date("August 16, 2026 00:00:00").getTime();

    function updateCountdown(){
        let now = new Date().getTime();
        let distance = countdownDate - now;

        if (distance < 0) {
            if(daysElement) daysElement.innerHTML = "00";
            if(hoursElement) hoursElement.innerHTML = "00";
            if(minutesElement) minutesElement.innerHTML = "00";
            if(secondsElement) secondsElement.innerHTML = "00";
            return;
        }

        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if(daysElement) daysElement.innerHTML = String(days).padStart(2, '0');
        if(hoursElement) hoursElement.innerHTML = String(hours).padStart(2, '0');
        if(minutesElement) minutesElement.innerHTML = String(minutes).padStart(2, '0');
        if(secondsElement) secondsElement.innerHTML = String(seconds).padStart(2, '0');
    }

    // Run immediately on page load so there is zero initial delay
    updateCountdown();

    // Standard real-time 1-second countdown speed
    setInterval(updateCountdown, 1000);


    // ==========================================
    // 2. INTERACTIVE DUROOD COUNTER LOGIC
    // ==========================================
    const duroodDisplay = document.getElementById("duroodCount");
    const incrementBtn = document.getElementById("incrementDuroodBtn");

    if (duroodDisplay && incrementBtn) {
        // Retrieve stored count from localStorage or default to 0
        let currentCount = parseInt(localStorage.getItem("rabiDuroodCount")) || 12750;
        duroodDisplay.innerText = currentCount.toLocaleString();

        incrementBtn.addEventListener("click", function(){
            currentCount++;
            localStorage.setItem("rabiDuroodCount", currentCount);
            duroodDisplay.innerText = currentCount.toLocaleString();

            // Subtle button animation feedback
            incrementBtn.style.transform = "scale(0.95)";
            setTimeout(() => {
                incrementBtn.style.transform = "scale(1)";
            }, 100);
        });
    }


    // ==========================================
    // 3. NAAT SHARIF SECTION LOGIC
    // ==========================================

    // A. Single Active Audio Playback
   const playBtns = document.querySelectorAll(".play-btn");
const allAudios = document.querySelectorAll(".naat-card audio");

let currentPlayingAudio = null;
let currentPlayingCard = null;


// ===============================
// Audio Setup
// ===============================

allAudios.forEach(audio => {

    const card = audio.closest(".naat-card");
    const progress = card.querySelector(".progress-bar");

    // Audio metadata loaded
    audio.addEventListener("loadedmetadata", () => {

        progress.max = audio.duration;

        progress.value = 0;

    });


    // Update progress bar
    audio.addEventListener("timeupdate", () => {

        progress.value = audio.currentTime;

    });


    // Seek audio
    progress.addEventListener("input", () => {

        audio.currentTime = progress.value;

    });


    // Audio ended
    audio.addEventListener("ended", () => {

        card.classList.remove("playing");

        const icon = card.querySelector(".play-btn i");

        if (icon) {

            icon.classList.remove("fa-pause");
            icon.classList.add("fa-play");

        }

        progress.value = 0;

        if (currentPlayingAudio === audio) {

            currentPlayingAudio = null;
            currentPlayingCard = null;

        }

    });


    // Audio error
    audio.addEventListener("error", () => {

        console.log("Audio Error:", audio.src);

    });

});


// ===============================
// Play / Pause Buttons
// ===============================

playBtns.forEach(btn => {

    btn.addEventListener("click", function () {

        const card = this.closest(".naat-card");
        const audio = card.querySelector("audio");
        const icon = this.querySelector("i");


        // Stop previous audio
        if (
            currentPlayingAudio &&
            currentPlayingAudio !== audio
        ) {

            currentPlayingAudio.pause();
            currentPlayingAudio.currentTime = 0;

            if (currentPlayingCard) {

                currentPlayingCard.classList.remove("playing");

                const prevIcon =
                    currentPlayingCard.querySelector(".play-btn i");

                if (prevIcon) {

                    prevIcon.classList.remove("fa-pause");
                    prevIcon.classList.add("fa-play");

                }

            }

        }


        // Play
        if (audio.paused) {

            audio.volume = 0.5;

            audio.play()
                .then(() => {

                    card.classList.add("playing");

                    icon.classList.remove("fa-play");
                    icon.classList.add("fa-pause");

                    currentPlayingAudio = audio;
                    currentPlayingCard = card;

                })
                .catch(error => {

                    console.log(
                        "Audio playback error:",
                        error
                    );

                });

        }

        // Pause
        else {

            audio.pause();

            card.classList.remove("playing");

            icon.classList.remove("fa-pause");
            icon.classList.add("fa-play");

            currentPlayingAudio = null;
            currentPlayingCard = null;

        }

    });

});
    // B. Category Filter Tabs
    const filterBtns = document.querySelectorAll(".naat-filter-btn");
    const naatCards = document.querySelectorAll(".naat-card");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", function(){
            filterBtns.forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            const filterValue = this.getAttribute("data-filter");

            naatCards.forEach(card => {
                if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // C. Lyrics Drawer Toggle
    const lyricsBtns = document.querySelectorAll(".lyrics-toggle-btn");

    lyricsBtns.forEach(btn => {
        btn.addEventListener("click", function(){
            const card = this.closest(".naat-card");
            const lyricsBox = card.querySelector(".naat-lyrics-box");

            if (lyricsBox) {
                lyricsBox.classList.toggle("active");
                if (lyricsBox.classList.contains("active")) {
                    this.innerHTML = '<i class="fa-solid fa-xmark"></i> Hide Lyrics';
                } else {
                    this.innerHTML = '<i class="fa-solid fa-file-lines"></i> Read Lyrics';
                }
            }
        });
    });

});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});