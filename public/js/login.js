const { response } = require("express");

const loginFormEl = document.querySelector(".login-form");
const signupFormEl = document.querySelector(".signup-form");

const loginFormHandler = async (event) => {
   event.preventDefault();

   // dom hooks
   const emailInputEl = document.querySelector("#email-login");
   const passwordInputEl = document.querySelector("#password-login");
   const loginAlertEl = document.querySelector(".login-form .alert");

   const email = emailInputEl.value.trim();
   const password = passwordInputEl.value.trim();

   // if the user provided both an email and a password, attempt to log in
   if (email && password) {
      const response = fetch('/api/user/login', {
         method: 'POST',
         // compile login info into json object to send
         body: JSON.stringify({
            email: email,
            password: password
         }),
         headers: {
            'Content-Type': 'application/json'
         }
      });

      if (response.ok) {
         // if the login was successful, redirect to homepage
         document.location.replace('/');
      } else {
         // if the login was unsuccessful, display an alert
         loginAlertEl.classList.remove('d-none');
      }
   }
};

const signupFormHandler = async (event) => {
   event.preventDefault();

   // dom hooks
   const signupUsernameInputEl = document.querySelector("#username-signup");
   const signupEmailInputEl = document.querySelector("#email-signup");
   const signupPasswordInputEl = document.querySelector("#password-signup");
   const signupAlertEl = document.querySelector(".signup-form .alert");

   // get user input data
   const username = signupUsernameInputEl.value.trim();
   const email = signupEmailInputEl.value.trim();
   const password = signupPasswordInputEl.value.trim();

   if (username && email && password) {
      // if user provided enough data, attempt to sign them up
      const response = await fetch('/api/user/signup', {
         method: 'POST',
         // compile user info into json object to send
         body: JSON.stringify({
            username: username,
            email: email,
            password: password
         }),
         headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
         // if signup was successful, redirect to homepage
         document.location.replace('/');
      } else {
         // if signup was unsuccessful, display an alert
         signupAlertEl.classList.remove('d-none');
      }
   }
}

// add event listeners for both submit buttons
loginFormEl.addEventListener('submit', loginFormHandler);
signupFormEl.addEventListener('submit', signupFormHandler);