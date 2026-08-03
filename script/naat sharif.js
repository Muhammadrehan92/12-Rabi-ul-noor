// ==========================
// FEATURED KALAAM AUDIO
// ==========================

const featuredPlayBtn = document.getElementById("featuredPlayBtn");
const featuredAudio = document.getElementById("featuredAudio");

const featuredProgress =
    document.getElementById("featuredProgress");

const featuredCurrentTime =
    document.getElementById("featuredCurrentTime");

const featuredDuration =
    document.getElementById("featuredDuration");


// ==========================
// FORMAT TIME
// ==========================

function formatFeaturedTime(seconds){

    if(isNaN(seconds)){
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);

    const secs = Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");

    return `${minutes}:${secs}`;
}


// ==========================
// AUDIO LOADED
// ==========================

if(featuredAudio){

    featuredAudio.addEventListener(
        "loadedmetadata",
        function(){

            featuredProgress.max =
                featuredAudio.duration;

            featuredDuration.textContent =
                formatFeaturedTime(
                    featuredAudio.duration
                );

        }
    );

}


// ==========================
// PLAY / PAUSE
// ==========================

if(featuredPlayBtn && featuredAudio){

    featuredPlayBtn.addEventListener(
        "click",
        function(e){

            e.preventDefault();

            const icon =
                featuredPlayBtn.querySelector("i");

            const text =
                featuredPlayBtn.querySelector("span");


            if(featuredAudio.paused){

                featuredAudio.play()
                    .then(function(){

                        icon.classList.remove("fa-play");
                        icon.classList.add("fa-pause");

                        text.textContent = "Pause";

                    })
                    .catch(function(error){

                        console.log(
                            "Audio playback error:",
                            error
                        );

                    });

            }

            else{

                featuredAudio.pause();

                icon.classList.remove("fa-pause");
                icon.classList.add("fa-play");

                text.textContent = "Listen Now";

            }

        }
    );

}


// ==========================
// UPDATE PROGRESS
// ==========================

if(featuredAudio){

    featuredAudio.addEventListener(
        "timeupdate",
        function(){

            featuredProgress.value =
                featuredAudio.currentTime;

            featuredCurrentTime.textContent =
                formatFeaturedTime(
                    featuredAudio.currentTime
                );

        }
    );

}


// ==========================
// SEEK FORWARD / BACKWARD
// ==========================

if(featuredProgress && featuredAudio){

    featuredProgress.addEventListener(
        "input",
        function(){

            featuredAudio.currentTime =
                featuredProgress.value;

        }
    );

}


// ==========================
// AUDIO ENDED
// ==========================

if(featuredAudio){

    featuredAudio.addEventListener(
        "ended",
        function(){

            featuredProgress.value = 0;

            featuredCurrentTime.textContent =
                "0:00";

            const icon =
                featuredPlayBtn.querySelector("i");

            const text =
                featuredPlayBtn.querySelector("span");

            icon.classList.remove("fa-pause");
            icon.classList.add("fa-play");

            text.textContent = "Listen Now";

        }
    );

}


// ==================================
// ALL NAAT CARDS AUDIO PLAYER JS
// ==================================

document.addEventListener("DOMContentLoaded", function() {
    const naatCards = document.querySelectorAll(".naat-card");

    let currentlyPlayingAudio = null;
    let currentlyPlayingBtn = null;

    naatCards.forEach(function(card) {
        const audio = card.querySelector("audio");
        const playBtn = card.querySelector(".play-btn");
        const progress = card.querySelector(".card-progress");
        const currentTimeEl = card.querySelector(".current-time");
        const durationTimeEl = card.querySelector(".duration-time");

        if (!audio || !playBtn || !progress) return;

        function formatTime(seconds) {
            if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
            return `${mins}:${secs}`;
        }

        function updateDuration() {
            if (audio.duration) {
                progress.max = audio.duration;
                if (durationTimeEl) {
                    durationTimeEl.textContent = formatTime(audio.duration);
                }
            }
        }

        // Set duration on loadedmetadata
        audio.addEventListener("loadedmetadata", updateDuration);

        // Fallback if metadata already loaded
        if (audio.readyState >= 1) {
            updateDuration();
        }

        // Time update
        audio.addEventListener("timeupdate", function() {
            progress.value = audio.currentTime;
            if (currentTimeEl) {
                currentTimeEl.textContent = formatTime(audio.currentTime);
            }
        });

        // Seek range
        progress.addEventListener("input", function() {
            audio.currentTime = progress.value;
        });

        // Play / Pause toggle
        playBtn.addEventListener("click", function(e) {
            e.preventDefault();

            // Pause featured audio if playing
            if (featuredAudio && !featuredAudio.paused) {
                featuredAudio.pause();
                if (featuredPlayBtn) {
                    const fIcon = featuredPlayBtn.querySelector("i");
                    const fText = featuredPlayBtn.querySelector("span");
                    if (fIcon) { fIcon.classList.remove("fa-pause"); fIcon.classList.add("fa-play"); }
                    if (fText) { fText.textContent = "Listen Now"; }
                }
            }

            // Pause any other playing card audio
            if (currentlyPlayingAudio && currentlyPlayingAudio !== audio) {
                currentlyPlayingAudio.pause();
                if (currentlyPlayingBtn) {
                    currentlyPlayingBtn.innerHTML = '<i class="fa-solid fa-play"></i> Play';
                }
            }

            if (audio.paused) {
                audio.play()
                    .then(function() {
                        currentlyPlayingAudio = audio;
                        currentlyPlayingBtn = playBtn;
                        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
                    })
                    .catch(function(err) {
                        console.log("Audio play error:", err);
                    });
            } else {
                audio.pause();
                currentlyPlayingAudio = null;
                currentlyPlayingBtn = null;
                playBtn.innerHTML = '<i class="fa-solid fa-play"></i> Play';
            }
        });

        // Ended event
        audio.addEventListener("ended", function() {
            progress.value = 0;
            if (currentTimeEl) currentTimeEl.textContent = "0:00";
            playBtn.innerHTML = '<i class="fa-solid fa-play"></i> Play';
            currentlyPlayingAudio = null;
            currentlyPlayingBtn = null;
        });
    });
});