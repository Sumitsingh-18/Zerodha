// export const API_BASE = "http://localhost:4000";
// export const DASHBOARD_URL = "http://localhost:4000/dashboard";

// frontend/src/config.js
export const API_BASE =   process.env.NODE_ENV === "production"
    ? ""
    : "http://localhost:4000";
  

export const DASHBOARD_URL =
  process.env.NODE_ENV === "production"
    ? "/dashboard"
    : "http://localhost:4000/dashboard";
