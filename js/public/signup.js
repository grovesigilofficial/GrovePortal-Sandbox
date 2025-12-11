// js/public/signup.js
import { supabase } from '../supabase/supabaseClient.js';

const signupForm = document.getElementById("signupForm");
const signupMsg = document.getElementById("signupMsg");

signupForm && signupForm.addEventListener("submit", async (e)=>{
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  if(!name || !email){ signupMsg.textContent = "Enter name & email"; return; }
  signupMsg.textContent = "Sending...";
  try{
    const { error } = await supabase
      .from('subscriptions')
      .insert({ name, email, created_at: new Date().toISOString() });
    if(error) throw error;
    signupMsg.textContent = "Subscription received — admin will contact you.";
    signupForm.reset();
  }catch(err){
    console.error(err);
    signupMsg.textContent = "Error sending — saved locally.";
    const listRaw = localStorage.getItem("signupBackup");
    const list = listRaw ? JSON.parse(listRaw) : [];
    list.push({ name, email, ts: new Date().toISOString() });
    localStorage.setItem("signupBackup", JSON.stringify(list));
  }
});
