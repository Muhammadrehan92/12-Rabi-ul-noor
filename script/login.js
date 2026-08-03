// ============================
// SHOW LOGIN
// ============================

function showLogin(){

    document
        .getElementById("signupForm")
        .classList.add("hidden");

    document
        .getElementById("loginForm")
        .classList.remove("hidden");

}


// ============================
// SHOW SIGNUP
// ============================

function showSignup(){

    document
        .getElementById("loginForm")
        .classList.add("hidden");

    document
        .getElementById("signupForm")
        .classList.remove("hidden");

}


// ============================
// SHOW / HIDE PASSWORD
// ============================

function togglePassword(inputId, button){

    const input =
        document.getElementById(inputId);

    const icon =
        button.querySelector("i");


    if(input.type === "password"){

        input.type = "text";

        icon.classList.remove("fa-eye");

        icon.classList.add("fa-eye-slash");

    }

    else{

        input.type = "password";

        icon.classList.remove("fa-eye-slash");

        icon.classList.add("fa-eye");

    }

}

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});