/* =========================================================
   FILE: /js/auth.js
   PURPOSE: Instagram-style multi-step signup logic
   REQUIREMENTS:
   - Supabase project connected
   - profiles table exists
   - This file is loaded in index.html
========================================================= */

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

/* =====================
   SUPABASE INIT
===================== */
const supabaseUrl = "YOUR_SUPABASE_URL";
const supabaseKey = "YOUR_PUBLIC_ANON_KEY";

const supabase = createClient(supabaseUrl, supabaseKey);

/* =====================
   SIGNUP HANDLER
===================== */
async function signupUser() {
  const email = document.getElementById("email")?.value.trim();
  const password = document.getElementById("password")?.value;
  const username = document.getElementById("username")?.value.trim();
  const fullName = document.getElementById("full-name")?.value.trim();
  const dob = document.getElementById("dob")?.value;

  if (!email || !password || !username || !fullName || !dob) {
    alert("All fields are required");
    return;
  }

  /* =====================
     CHECK EMAIL
  ===================== */
  const { data: emailExists, error: emailError } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (emailExists) {
    alert("Email already in use");
    return;
  }

  /* =====================
     CHECK USERNAME
  ===================== */
  const { data: usernameExists } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .maybeSingle();

  if (usernameExists) {
    alert("Username already taken");
    return;
  }

  /* =====================
     CREATE AUTH USER
  ===================== */
  const { data: authData, error: authError } =
    await supabase.auth.signUp({
      email,
      password,
    });

  if (authError) {
    alert(authError.message);
    return;
  }

  const userId = authData.user.id;

  /* =====================
     INSERT PROFILE
  ===================== */
  const { error: profileError } = await supabase
    .from("profiles")
    .insert({
      id: userId,
      email,
      username,
      full_name: fullName,
      dob,
    });

  if (profileError) {
    alert("Profile creation failed");
    return;
  }

  alert("Account created successfully");
}

/* =====================
   EXPORT TO WINDOW
===================== */
window.signupUser = signupUser;
