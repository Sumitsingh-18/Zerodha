import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../Config";
import "./sign.css"; // import css file

export default function Signup() {
  const [phone, setPhone] = useState("");
  const [stage, setStage] = useState("phone"); // phone | otp
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
    setLoading(true); setMsg("");
    try {
      const r = await fetch(`${API_BASE}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ phone })
      });
      const d = await r.json();
      if (!d.ok) throw new Error(d.message || "Failed");
      setStage("otp");
      setMsg("OTP sent. Check your phone.");
    } catch (e) {
      setMsg(e.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true); setMsg("");
    try {
      const r = await fetch(`${API_BASE}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ phone, otp })
      });
      const d = await r.json();
      if (!d.ok) throw new Error(d.message || "Invalid OTP");
      navigate("/complete-profile", { state: { phone } });
    } catch (e) {
      setMsg(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      {/* Left Section */}
    

      {/* Right Section */}
      <div className="signup-left">
        <h2>Open a free demat and trading account online</h2>
        <p>
          Start investing brokerage free and join a community of 1.6+ crore investors and traders
        </p>
        </div>
        
      
      <div className="signup-card">
        <h2>Signup now</h2>
        <p className="subtitle">Or track your existing application</p>

        {stage === "phone" && (
          <>
            <div className="phone-input">
              <span className="country-code"> +91</span>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your mobile number"
              />
            </div>
            <button onClick={sendOtp} disabled={loading} className="btn-primary">
              {loading ? "Sending..." : "Get OTP"}
            </button>
          </>
        )}

        {stage === "otp" && (
          <>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="otp-input"
            />
            <button onClick={verifyOtp} disabled={loading} className="btn-primary">
              {loading ? "Verifying..." : "Continue"}
            </button>
            <button onClick={sendOtp} disabled={loading} className="btn-secondary">
              Resend OTP
            </button>
          </>
        )}

        {msg && (
          <p className={`message ${msg.includes("Check") ? "success" : "error"}`}>
            {msg}
          </p>
        )}

        <p className="terms">
          By proceeding, you agree to the <span>terms</span> & <span>privacy policy</span>
        </p>

        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
      
    </div>
  );
}



//--------------------------------------------------------------


