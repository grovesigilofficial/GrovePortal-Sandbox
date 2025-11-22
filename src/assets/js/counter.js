// src/assets/js/counter.js
import { supabase } from './supabase.js';

// Safe DOM getters (may be missing on some pages)
const getEl = id => document.getElementById(id);

// exportable functions for pages that call them directly
export async function getDay() {
  try {
    const { data, error } = await supabase
      .from('uberman_counter')
      .select('day')
      .limit(1)
      .single();

    if (error) {
      console.error('Supabase getDay error:', error);
      return 0;
    }
    return data?.day ?? 0;
  } catch (e) {
    console.error('getDay failed:', e);
    return 0;
  }
}

export async function setDay(val) {
  try {
    // Check existing row
    const { data: existing, error: fetchError } = await supabase
      .from('uberman_counter')
      .select('id')
      .limit(1)
      .single();

    if (fetchError) {
      console.error('setDay fetchError:', fetchError);
      return;
    }

    if (existing && existing.id) {
      const { error } = await supabase
        .from('uberman_counter')
        .update({ day: val })
        .eq('id', existing.id);

      if (error) console.error('Error updating day:', error);
    } else {
      const { error } = await supabase
        .from('uberman_counter')
        .insert({ day: val });

      if (error) console.error('Error inserting day:', error);
    }
    await updateCounterDisplay();
  } catch (e) {
    console.error('setDay failed:', e);
  }
}

export async function incrementDay() {
  const cur = await getDay();
  await setDay(cur + 1);
}

export async function resetDay() {
  await setDay(0);
}

export async function updateCounterDisplay() {
  const el = getEl('counter-display');
  if (!el) return;
  el.textContent = String(await getDay());
}

// Attach to DOM where appropriate
document.addEventListener('DOMContentLoaded', () => {
  // Init display if present
  updateCounterDisplay();

  const inc = getEl('increment-btn');
  const res = getEl('reset-btn');

  if (inc) inc.addEventListener('click', incrementDay);
  if (res) res.addEventListener('click', resetDay);
});
