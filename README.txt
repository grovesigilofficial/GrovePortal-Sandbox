Grove Portal — Deployment notes

1) File layout: follow the project structure in the repo root:
   - css/style.css
   - index.html, lock.html
   - pages/*.html
   - js/supabase/supabaseClient.js
   - js/admin/admin.js
   - js/public/publicTimer.js
   - js/public/signup.js
   - assets/alarm-placeholder.txt

2) Supabase:
   - Tables required (exact names):
     * public.subscriptions (columns: id int8 PK, name text, email text, created_at timestamptz default now())
     * public.uberman_sessions (id uuid default gen_random_uuid(), user text, start_time timestamp, running bool default false, last_reset timestamp)
   - Required policies: allow public SELECT on uberman_sessions and public INSERT on subscriptions (for demo). Use Row Level Security and write policies safely later.
   - In Vercel, set environment variables:
     - NEXT_PUBLIC_SUPABASE_URL or similar — but this code expects global injection:
       window.__SUPABASE_URL__ and window.__SUPABASE_ANON__
     - On Vercel you can add a small script to your index.html (only on the deployed site) to inject them:
       <script>window.__SUPABASE_URL__ = "https://..."; window.__SUPABASE_ANON__ = "anon-...";</script>

3) Admin password:
   - Hard-coded to: ES@2610011171
   - You can change it inside js/admin/admin.js (ADMIN_PASSWORD) and lock.html.

4) Notes:
   - Admin page writes sessions to supabase and marks running=true.
   - Public page polls supabase once per second; keep usage moderate.
   - If you lack alarm.mp3, put a file named `alarm.mp3` in the repository root or use the fallback tone.

5) Troubleshooting:
   - If code returns empty arrays for subscriptions, enable and create RLS policies to permit inserts/selects for anon/public roles.
   - Check console for CORS or missing-key warnings.
