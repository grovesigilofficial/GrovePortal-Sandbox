// src/assets/js/counter.js
import { CONFIG } from './config.js';

// localStorage key
const KEY = CONFIG.LOCAL_COUNTER_KEY || 'grove_uberman_day';

// Counter helpers
export function getDayValue() {
  const raw = localStorage.getItem(KEY);
  const n = parseInt(raw, 10);
  return Number.isNaN(n) ? 0 : n;
}

export function setDayValue(val) {
  const num = Number(val) || 0;
  localStorage.setItem(KEY, String(num));
  return num;
}

export function incrementDayValue() {
  const cur = getDayValue();
  return setDayValue(cur + 1);
}

export function resetDayValue() {
  return setDayValue(0);
}

// DOM helpers
function el(id) { return document.getElementById(id); }

// Counter display update
export function updateCounterDisplay() {
  const display = el('counter-display');
  if (!display) return;
  display.textContent = String(getDayValue());
}

// Timer display
function updateTimer() {
  const timerEl = el('live-timer');
  if (!timerEl) return;
  const now = new Date();
  const formatted = now.toLocaleTimeString('en-US', { hour12: false }) + '.' + now.getMilliseconds().toString().padStart(3,'0');
  timerEl.textContent = formatted;
}

// Attach admin buttons (only present on admin page)
function attachAdminButtons() {
  const incBtn = el('increment-btn');
  const resetBtn = el('reset-btn');
  const setBtn = el('set-day-btn');
  const input = el('manual-day');

  if (incBtn) incBtn.addEventListener('click', () => { incrementDayValue(); updateCounterDisplay(); });
  if (resetBtn) resetBtn.addEventListener('click', () => { resetDayValue(); updateCounterDisplay(); });
  if (setBtn && input) setBtn.addEventListener('click', () => {
    const n = Number(input.value);
    if (Number.isNaN(n) || n < 0) return alert('Enter valid number');
    setDayValue(n);
    updateCounterDisplay();
  });
}

// Exported functions for external pages
export async function getDay() { return getDayValue(); }
export async function setDay(n) { return setDayValue(n); }
export async function incrementDay() { const v = incrementDayValue(); updateCounterDisplay(); return v; }
export async function resetDay() { const v = resetDayValue(); updateCounterDisplay(); return v; }

// Auto-init on DOM
document.addEventListener('DOMContentLoaded', () => {
  updateCounterDisplay();
  attachAdminButtons();
  setInterval(updateTimer, 10); // update timer every 10ms
});
