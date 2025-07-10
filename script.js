// script.js

// Firebase must be loaded first (firebase-config.js)

const submitBtn = document.getElementById('submit-btn');
const sendBtn = document.getElementById('send-btn');
const formSection = document.getElementById('form-section');
const gossipInput = document.getElementById('gossip-input');
const gossipFeed = document.getElementById('gossip-feed');

submitBtn.addEventListener('click', () => {
  formSection.classList.toggle('hidden');
  gossipInput.focus();
});

sendBtn.addEventListener('click', async () => {
  const text = gossipInput.value.trim();
  if (!text) {
    alert('Please enter some gossip!');
    return;
  }
  
  try {
    await addDoc(collection(db, 'gossip'), {
      text: text,
      timestamp: serverTimestamp()
    });
    gossipInput.value = '';
    formSection.classList.add('hidden');
  } catch (e) {
    alert('Error sending gossip. Try again.');
  }
});

function formatDate(timestamp) {
  if (!timestamp) return '';
  const date = timestamp.toDate();
  return date.toLocaleString();
}

function renderGossip(doc) {
  const li = document.createElement('li');
  li.textContent = `${doc.data().text} — ${formatDate(doc.data().timestamp)}`;
  gossipFeed.appendChild(li);
}

// Listen for realtime updates
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const q = query(collection(db, 'gossip'), orderBy('timestamp', 'desc'));

onSnapshot(q, (snapshot) => {
  gossipFeed.innerHTML = '';
  snapshot.forEach(doc => {
    renderGossip(doc);
  });
});
