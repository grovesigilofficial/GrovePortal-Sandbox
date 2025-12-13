// Initialize Supabase
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Step Navigation
const steps = ['step-1','step-2','step-3','step-4','step-5'];
let currentStep = 0;

function showStep(index){
  steps.forEach((id,i)=>{
    document.getElementById(id).classList.toggle('hidden', i!==index);
  });
}
showStep(currentStep);

// Step 1: Email
document.getElementById('next-1').onclick = async ()=>{
  const email = document.getElementById('email').value.trim();
  if(!email){ document.getElementById('email-error').innerText = "Email required"; return; }
  // Real-time check if email exists
  const { data, error } = await supabase.auth.getUserByEmail(email).catch(()=>({data:null}));
  if(data) { document.getElementById('email-error').innerText="Email already registered"; return; }
  currentStep++; showStep(currentStep);
};

// Step 2: Full Name
document.getElementById('next-2').onclick = ()=>{
  const name = document.getElementById('full-name').value.trim();
  if(!name){ document.getElementById('name-error').innerText="Full name required"; return; }
  currentStep++; showStep(currentStep);
};

// Step 3: Username
document.getElementById('next-3').onclick = async ()=>{
  const username = document.getElementById('username').value.trim();
  if(!username){ document.getElementById('username-error').innerText="Username required"; return; }
  // Check username uniqueness in Supabase table
  const { data, error } = await supabase.from('profiles').select('username').eq('username', username);
  if(data.length>0){ document.getElementById('username-error').innerText="Username taken"; return; }
  currentStep++; showStep(currentStep);
};

// Step 4: Password
document.getElementById('next-4').onclick = ()=>{
  const pass = document.getElementById('password').value;
  const confirm = document.getElementById('confirm-password').value;
  if(pass.length<6){ document.getElementById('password-error').innerText="Password too short"; return; }
  if(pass!==confirm){ document.getElementById('password-error').innerText="Passwords do not match"; return; }
  currentStep++; showStep(currentStep);
};

// Step 5: DOB / Submit
document.getElementById('submit-signup').onclick = async ()=>{
  const dob = document.getElementById('dob').value;
  if(!dob){ document.getElementById('dob-error').innerText="DOB required"; return; }

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const username = document.getElementById('username').value.trim();
  const fullName = document.getElementById('full-name').value.trim();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName, username: username, dob } }
  });
  if(error){ document.getElementById('dob-error').innerText = error.message; return; }
  alert("Signup successful! Redirecting...");
  window.location.href = "index.html";
};

// Toggle Login Form
document.getElementById('show-login').onclick = ()=>{
  document.getElementById('login-step').classList.remove('hidden');
  steps.forEach(id=>document.getElementById(id).classList.add('hidden'));
  document.getElementById('login-toggle').classList.add('hidden');
  document.getElementById('form-title').innerText="Log In";
};

// Login
document.getElementById('login-btn').onclick = async ()=>{
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  if(!email || !password){ document.getElementById('login-error').innerText="Enter credentials"; return; }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if(error){ document.getElementById('login-error').innerText = error.message; return; }
  alert("Login successful! Redirecting...");
  window.location.href = "index.html";
};
