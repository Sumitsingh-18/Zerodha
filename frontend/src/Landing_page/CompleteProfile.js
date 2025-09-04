import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { API_BASE, DASHBOARD_URL } from "./Config";
import "./profile.css";

export default function CompleteProfile() {
  const { state } = useLocation();
  const phone = state?.phone || ""; // came from /signup
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);


  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setMsg("");
    try {
      const r = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ phone, name, email, password })
      });


      const d = await r.json();
      if (!d.ok) throw new Error(d.message || "Failed");

       localStorage.setItem("user", JSON.stringify(d.user));
       

      // logged in by server -> go to dashboard app
      window.location.href = DASHBOARD_URL;
    } catch (e) {
      setMsg(e.message);
    } finally {
      setLoading(false);
    }
  };

  


  if (!phone) {
    return <div style={{ maxWidth: 420, margin: "40px auto" }}>
      <p>Phone number missing. Please <a href="/signup">start again</a>.</p>
    </div>;
  }

  
  return (
    <>

     <div className="top">
        <h2>Sleek, modern and intuitive trading platforms</h2>
        <p>
          Start investing brokerage free and join a community of 1.6+ crore investors and traders
        </p>
      </div>


     <div className="profile-container">

      <div className="kite">
      <img src="images/kite.png" alt="Platform Preview" />
        </div>

      <div className="profile-card">
        <h2>Create your account</h2>
        <form onSubmit={submit} className="profile-form">
          <input
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>
        {msg && <p className="error-msg">{msg}</p>}
      </div>
    </div>
    </>
  );
}
