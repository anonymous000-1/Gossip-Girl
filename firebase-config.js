// firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDh0FRUDHrWGjP0PsoyNTyo9Do-wNqKqHU",
  authDomain: "gossipgirl-project.firebaseapp.com",
  projectId: "gossipgirl-project",
  storageBucket: "gossipgirl-project.firebasestorage.app",
  messagingSenderId: "8712402840",
  appId: "1:8712402840:web:51f1e8f44689938c1edded"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
