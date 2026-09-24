let points = Number(localStorage.getItem("knoxPoints")) || 0;
let completed = Number(localStorage.getItem("knoxCompleted")) || 0;

const POINT_VALUE = 0.01;

const pointsEl = document.getElementById("points");
const balanceEl = document.getElementById("balance");
const completedEl = document.getElementById("completed");
const walletPointsEl = document.getElementById("walletPoints");
const walletMoneyEl = document.getElementById("walletMoney");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const toast = document.getElementById("toast");

function updateDisplay() {
  const money = points * POINT_VALUE;

  pointsEl.textContent = points;
  balanceEl.textContent = `₦${money.toFixed(2)}`;
  completedEl.textContent = completed;

  walletPointsEl.textContent = points;
  walletMoneyEl.textContent = `₦${money.toFixed(2)}`;

  localStorage.setItem("knoxPoints", points);
  localStorage.setItem("knoxCompleted", completed);
}

function completeTask(amount, button) {
  if (button.disabled) {
    return;
  }

  points += amount;
  completed++;

  button.textContent = "✓ Done";
  button.disabled = true;

  updateDisplay();
  showToast(`+${amount} points added!`);
}

function scrollToTasks() {
  document.getElementById("tasks").scrollIntoView({
    behavior: "smooth"
  });
}

function requestPayout() {
  if (points < 1000) {
    showToast("You need at least 1,000 points.");
    return;
  }

  showToast(
    "Payout system is not connected yet."
  );
}

function copyReferral() {
  const code = document.getElementById("refCode").textContent;

  navigator.clipboard.writeText(code)
    .then(() => {
      showToast("Referral code copied!");
    })
    .catch(() => {
      showToast("Copy failed.");
    });
}

function showToast(message) {
  toast.textContent = message;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 2500);
}

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("show");
});

updateDisplay();
