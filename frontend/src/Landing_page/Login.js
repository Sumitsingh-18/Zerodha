import React, { useState } from "react";
import { API_BASE, DASHBOARD_URL } from "./Config";
import "./login.css";

export default function Login() {
  const [username, setUsername] = useState(""); // email or phone
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault(); setMsg("");
    try {
      const r = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password })
      });
      const d = await r.json();
      if (!d.ok) throw new Error(d.message || "Login failed");

      localStorage.setItem("user", JSON.stringify(d.user));

      window.location.href = DASHBOARD_URL;
    } catch (e) {
      setMsg(e.message);
    }
  };



  return (
    // <div style={{ maxWidth: 420, margin: "40px auto" }}>
    //   <h2>Login</h2>
    //   <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
    //     <input placeholder="Email or phone" value={username} onChange={(e) => setUsername(e.target.value)} required />
    //     <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    //     <button type="submit">Login</button>
    //   </form>
    //   {msg && <p style={{ color: "crimson" }}>{msg}</p>}
    //   <p style={{ marginTop: 24 }}>
    //     New here? <a href="/signup">Create account</a>
    //   </p>
    // </div>

      <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to continue</p>

        <form onSubmit={submit} className="login-form">
          <input
            placeholder="Email or phone"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>

        {msg && <p className="error-msg">{msg}</p>}

        <p className="switch-link">
          New here? <a href="/signup">Create account</a>
        </p>
      </div>
    </div>

  );
}
