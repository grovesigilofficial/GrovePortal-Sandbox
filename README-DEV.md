# GrovePortal-Sandbox (DEV)

This is a lightweight static sandbox for Grove development.
**DO NOT** commit secrets.

## How to use (local)
1. Create `src/assets/js/config.local.js` (see config.default.js)
2. Place an alarm at `public/alarm.mp3` (optional)
3. Run a static server (e.g., `npx serve .` or `npx live-server`)

## Deploy
- Deploy as a Vercel static site or any static host.
- Do not push `config.local.js` or `.env` to GitHub.

## Security
- If you committed secrets previously, delete the old repo or purge history. Better: create a new GitHub repo and push this clean copy.
