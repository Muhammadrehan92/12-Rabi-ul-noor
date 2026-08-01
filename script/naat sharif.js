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