import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// Your Firebase config — keep this exactly as is
const firebaseConfig = {
  apiKey: "AIzaSyDh0FRUDHrWGjP0PsoyNTyo9Do-wNqKqHU",
  authDomain: "gossipgirl-project.firebaseapp.com",
  projectId: "gossipgirl-project",
  storageBucket: "gossipgirl-project.appspot.com",
  messagingSenderId: "8712402840",
  appId: "1:8712402840:web:51f1e8f44689938c1edded"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      if (user.email === "meow999w@gmail.com") {
        window.location.href = "admin.html"; // Admin panel
      } else {
        window.location.href = "submit.html"; // Normal user tip submit
      }
    })
    .catch(() => {
      document.getElementById("error").textContent = "Wrong email or password, darling.";
    });
});

// Optional: keep users logged in on refresh
onAuthStateChanged(auth, (user) => {
  if (user) {
    if (user.email === "meow999w@gmail.com") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "submit.html";
    }
  }
});
