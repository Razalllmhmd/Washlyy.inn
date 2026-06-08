import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

window.login = function () {

  const e = document.getElementById("email").value;
  const p = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, e, p)
    .then(() => {

      alert("Login Success");

      window.location.href = "dashboard.html";

    })
    .catch((error) => {

      console.error(error);
      alert(error.message);

    });
};

window.signup = function () {

  const e = document.getElementById("email").value;
  const p = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, e, p)
    .then(() => {

      alert("Account Created Successfully");

    })
    .catch((error) => {

      console.error(error);
      alert(error.message);

    });
};
window.forgotPassword = async function () {

  const email = document.getElementById("email").value;

  if (!email) {
    alert("Please enter your email address first.");
    return;
  }

  try {

    await sendPasswordResetEmail(auth, email);

    alert(
      "Password reset link has been sent to your email."
    );

  } catch (error) {

    console.error(error);
    alert(error.message);

  }

};