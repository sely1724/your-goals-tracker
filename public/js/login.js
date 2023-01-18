const loginFormEl = Document.querySelector(".login-form");
const loginEmailInputEl = Document.querySelector("#email-login");
const loginPasswordInputEl = Document.querySelector("#password-login");

const signupFormEl = Document.querySelector(".signup-form")
const signupUsernameInputEl = Document.querySelector("#username-signup");
const signupEmailInputEl = Document.querySelector("#email-signup");
const signupPasswordInputEl = Document.querySelector("#password-signup");

const login = async (user) => {
   fetch('/api/user/login', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
   })
};

const signup = async (user) => {
   
}