import React, { useEffect, useState } from "react";
import { API_BASE } from "./config";

const Summary = () => {
 
    const [name, setName] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/auth/me`, {
          method: "GET",
          credentials: "include" // MUST include cookie so server can identify session
        });
        const data = await res.json();
        if (data.ok && data.user) {
          setName(data.user.name);
        } else {
          setName(null);
          // optional: redirect to login app
          // window.location.href = "http://localhost:5173/login";
        }
      } catch (err) {
        console.error("Failed to fetch /auth/me", err);
        setName(null);
      }
    })();
  }, []);

  const firstName = name ? name.split(" ")[0] : "User";


  return (
    <>
      <div className="username">
        <h6>Hi, {firstName}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>3.74k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>{" "}
            </p>
            <p>
              Opening balance <span>3.74k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings (13)</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className="profit">
              1.55k <small>+5.20%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>31.43k</span>{" "}
            </p>
            <p>
              Investment <span>29.88k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
