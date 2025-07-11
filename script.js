// === Config ===
const ADMIN_EMAIL = "meow999w@gmail.com";
const ADMIN_PASSWORD = "!g0dstare";

// === Common Functions ===
// Get tips array from localStorage (or empty array)
function getTips() {
  const tips = localStorage.getItem("gg_tips");
  return tips ? JSON.parse(tips) : [];
}

// Save tips array back to localStorage
function saveTips(tips) {
  localStorage.setItem("gg_tips", JSON.stringify(tips));
}

// === INDEX.HTML SCRIPT ===
if (document.getElementById("tipForm")) {
  const tipForm = document.getElementById("tipForm");
  const tipInput = document.getElementById("tipInput");
  const confirmation = document.getElementById("confirmation");

  tipForm.addEventListener("submit", e => {
    e.preventDefault();

    const tipText = tipInput.value.trim();
    if (tipText.length === 0) return;

    let tips = getTips();
    tips.push({ text: tipText, timestamp: Date.now() });
    saveTips(tips);

    tipInput.value = "";
    confirmation.classList.remove("hidden");

    // Hide confirmation after 3 seconds
    setTimeout(() => confirmation.classList.add("hidden"), 3000);
  });
}

// === ADMIN.HTML SCRIPT ===
if (document.getElementById("loginSection")) {
  const loginSection = document.getElementById("loginSection");
  const adminPanel = document.getElementById("adminPanel");
  const loginError = document.getElementById("loginError");
  const tipList = document.getElementById("tipList");
  const adminEmailInput = document.getElementById("adminEmail");
  const adminPasswordInput = document.getElementById("adminPassword");

  window.login = function () {
    const email = adminEmailInput.value.trim();
    const password = adminPasswordInput.value.trim();

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      loginError.classList.add("hidden");
      loginSection.classList.add("hidden");
      adminPanel.classList.remove("hidden");
      displayTips();
    } else {
      loginError.classList.remove("hidden");
    }
  };

  function displayTips() {
    const tips = getTips();
    if (tips.length === 0) {
      tipList.innerHTML = "<p>No tips submitted yet.</p>";
      return;
    }

    tipList.innerHTML = tips
      .map(
        tip =>
          `<div class="tip">
            <p>${escapeHtml(tip.text)}</p>
            <small>${new Date(tip.timestamp).toLocaleString()}</small>
          </div>`
      )
      .join("");
  }

  // Basic escape for HTML to avoid injection in display
  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}
