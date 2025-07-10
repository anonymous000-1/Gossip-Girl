// This script handles:
// - Sending tips (saved privately to Firebase Firestore)
// - Showing only approved posts publicly
// - Admin panel for approving tips with password protection

// Firebase config & init (replace with your own config)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js';

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

const tipForm = document.getElementById('tip-form');
const tipMessage = document.getElementById('tip-message');
const postsContainer = document.getElementById('posts');

tipForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const tipText = document.getElementById('tip-text').value.trim();
  const tipEmail = document.getElementById('tip-email').value.trim();

  if (!tipText || !tipEmail) {
    tipMessage.textContent = "Please fill in all fields.";
    tipMessage.style.color = "red";
    return;
  }

  try {
    await addDoc(collection(db, 'tips'), {
      text: tipText,
      email: tipEmail,
      approved: false,
      timestamp: Date.now()
    });

    tipMessage.textContent = "Thanks for the tip! Gossip Girl will review it soon.";
    tipMessage.style.color = "lightgreen";
    tipForm.reset();
  } catch (error) {
    tipMessage.textContent = "Oops, something went wrong. Try again later.";
    tipMessage.style.color = "red";
  }
});

// Load and display only approved posts
function renderPosts(posts) {
  postsContainer.innerHTML = '';
  posts.forEach(doc => {
    const data = doc.data();
    if (!data.approved) return; // show only approved

    const postEl = document.createElement('div');
    postEl.className = 'post';
    postEl.textContent = data.text;
    postsContainer.appendChild(postEl);
  });
}

const approvedQuery = query(collection(db, 'tips'), where('approved', '==', true));
onSnapshot(approvedQuery, (snapshot) => {
  renderPosts(snapshot.docs);
});
