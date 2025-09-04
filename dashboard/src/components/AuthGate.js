import React, { useEffect, useState } from "react";
import { API_BASE, LOGIN_URL } from "./config";

export default function AuthGate({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${API_BASE}/auth/me`, { credentials: "include" });
        const d = await r.json();
        if (!d.ok) window.location.href = LOGIN_URL;
        else setReady(true);
      } catch {
        window.location.href = LOGIN_URL;
      }
    })();
  }, []);

  if (!ready) return null; // or a spinner
  return <>{children}</>;
}
