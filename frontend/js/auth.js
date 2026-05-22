// ================================
// AUTHENTICATION SYSTEM
// frontend/js/auth.js
// ================================


// ================================
// REGISTER USER
// ================================

const registerForm = document.getElementById(
    "register-form"
);

if(registerForm){

    registerForm.addEventListener("submit",
    async (event) => {

        event.preventDefault();

        // Get Inputs
        const name = document.getElementById(
            "register-name"
        ).value;

        const email = document.getElementById(
            "register-email"
        ).value;

        const password = document.getElementById(
            "register-password"
        ).value;

        const confirmPassword = document.getElementById(
            "confirm-password"
        ).value;

        // Check Password Match
        if(password !== confirmPassword){

            alert("Passwords Do Not Match");

            return;

        }

        try{

            // Send Data To Backend
            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method:"POST",

                    headers:{
                        "Content-Type":"application/json"
                    },

                    body:JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );

            // Convert Response
            const data = await response.json();

            // Success
            if(response.ok){

                alert("Registration Successful");

                // Redirect
                window.location.href = "login.html";

            }

            else{

                alert(data.message);

            }

        }

        catch(error){

            console.log(error);

            alert("Something Went Wrong");

        }

    });

}


// ================================
// LOGIN USER
// ================================

const loginForm = document.getElementById(
    "login-form"
);

if(loginForm){

    loginForm.addEventListener("submit",
    async (event) => {

        event.preventDefault();

        // Get Inputs
        const email = document.getElementById(
            "login-email"
        ).value;

        const password = document.getElementById(
            "login-password"
        ).value;

        try{

            // Send Login Request
            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method:"POST",

                    headers:{
                        "Content-Type":"application/json"
                    },

                    body:JSON.stringify({
                        email,
                        password
                    })
                }
            );

            // Convert To JSON
            const data = await response.json();

            // Success
            if(response.ok){

                alert("Login Successful");

                // Save Token
                localStorage.setItem(
                    "token",
                    data.token
                );

                // Redirect
                window.location.href = "index.html";

            }

            else{

                alert(data.message);

            }

        }

        catch(error){

            console.log(error);

            alert("Login Failed");

        }

    });

}


// ================================
// LOGOUT USER
// ================================

function logoutUser(){

    localStorage.removeItem("token");

    alert("Logout Successful");

    window.location.href = "login.html";

}