// config.default.js
// Safe defaults. Never commit your real secret values.
// Create src/assets/js/config.local.js with your real admin values on your machine (gitignored).

export const CONFIG = {
  // LOCAL_COUNTER_KEY is the localStorage key used by the counter.
  LOCAL_COUNTER_KEY: "grove_uberman_day",

  // Admin credentials — replace only in config.local.js (gitignored).
  // DO NOT commit secrets into Git.
  adminUsername: "admin-placeholder",
  adminPassword: "password-placeholder"
};
