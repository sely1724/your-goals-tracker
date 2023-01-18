const { response } = require("express");

const loginFormEl = Document.querySelector(".login-form");

const signupFormEl = Document.querySelector(".signup-form");

const loginFormHandler = async (event) => {
   event.preventDefault();

   const emailInputEl = Document.querySelector("#email-login");
   const passwordInputEl = Document.querySelector("#password-login");
   const loginAlertEl = Document.querySelector(".login-form alert");

   const email = emailInputEl.value.trim();
   const password = passwordInputEl.value.trim();

   // if the user provided both an email and a password, attempt to log in
   if (email && password) {
      const response = fetch('/api/user/login', {
         method: 'POST',
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

   const signupUsernameInputEl = Document.querySelector("#username-signup");
   const signupEmailInputEl = Document.querySelector("#email-signup");
   const signupPasswordInputEl = Document.querySelector("#password-signup");

   const username = signupUsernameInputEl.value.trim();
   const email = signupEmailInputEl.value.trim();
   const password = signupPasswordInputEl.value.trim();

   if (username && email && password) {
      const response = await fetch('/api/user/signup', {
         method: 'POST',
         body: JSON.stringify({
            username: username,
            email: email,
            password: password
         })
      })
   }
}