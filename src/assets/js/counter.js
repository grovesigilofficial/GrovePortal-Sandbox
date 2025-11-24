// src/assets/js/counter.js
// Local-only counter + admin helpers (no backend)

// Config import
import { CONFIG } from './config.js';

// localStorage access
const KEY = CONFIG.LOCAL_COUNTER_KEY || 'grove_uberman_day';

// helper to read/write
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

// Update display element if present
export function updateCounterDisplay() {
  const display = el('counter-display');
  if (!display) return;
  display.textContent = String(getDayValue());
}

// Wire buttons / auto-init
function attachListeners() {
  const incBtn = el('increment-btn');
  const resetBtn = el('reset-btn');

  if (incBtn) incBtn.addEventListener('click', async (e) => {
    incrementDayValue();
    updateCounterDisplay();
  });

  if (resetBtn) resetBtn.addEventListener('click', async (e) => {
    resetDayValue();
    updateCounterDisplay();
  });
}

// Exported functions for external pages
export async function getDay() {
  return getDayValue();
}
export async function setDay(n) {
  return setDayValue(n);
}
export async function incrementDay() {
  const v = incrementDayValue();
  updateCounterDisplay();
  return v;
}
export async function resetDay() {
  const v = resetDayValue();
  updateCounterDisplay();
  return v;
}

// Auto init on pages that include this module
document.addEventListener('DOMContentLoaded', () => {
  updateCounterDisplay();
  attachListeners();
});
