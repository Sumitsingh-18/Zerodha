// export const API_BASE = "http://localhost:4000";
// export const SIGNUP_URL = "http://localhost:3000/signup";
// export const LOGIN_URL = "http://localhost:3000/login";

// dashboard/src/config.js
export const API_BASE =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:4000";

export const SIGNUP_URL = "/signup"; // relative in prod
export const LOGIN_URL = "/login";   // relative in prod
