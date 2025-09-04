import React, { useState } from "react";

import { Link } from "react-router-dom";


const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  
  //  const navigate = useNavigate();

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleLogout = async () => {
  try {
    const res = await fetch("http://localhost:4000/auth/logout", {
      method: "GET",
      credentials: "include", // send cookies to backend
    });
    const data = await res.json();

    if (data.ok) {
      // redirect to frontend login page
      window.location.href = "http://localhost:3000";
    } else {
      alert("Logout failed, try again!");
    }
  } catch (err) {
    console.error("Logout error:", err);
    alert("Something went wrong during logout.");
  }
};


  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" alt="/" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link style={{ textDecoration: "none" }} to="/" onClick={() => handleMenuClick(0)}>
            <p className={selectedMenu===0 ? activeMenuClass : menuClass}>Dashboard</p>
            </Link>
          </li>
          <li>
             <Link style={{ textDecoration: "none" }} to="/orders" onClick={() => handleMenuClick(1)}>
            <p className={selectedMenu===1 ? activeMenuClass : menuClass}>Orders</p>
            </Link>
          </li>
          <li>
             <Link style={{ textDecoration: "none" }} to="/holdings" onClick={() => handleMenuClick(2)}>
            <p className={selectedMenu===2 ? activeMenuClass : menuClass}>Holdings</p>
            </Link>
          </li>
          <li>
             <Link style={{ textDecoration: "none" }} to="positions" onClick={() => handleMenuClick(3)}>
            <p className={selectedMenu===3 ? activeMenuClass : menuClass}>Positions</p>
            </Link>
          </li>
          <li>
             <Link style={{ textDecoration: "none" }} to="/funds" onClick={() => handleMenuClick(4)}>
            <p className={selectedMenu===4 ? activeMenuClass : menuClass}>Funds</p>
            </Link>
          </li>
          <li>
             <Link style={{ textDecoration: "none" }} to="/apps" onClick={() => handleMenuClick(5)}>
            <p className={selectedMenu===5 ? activeMenuClass : menuClass}>Apps</p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile" onClick={handleLogout}>
          <div className="avatar">ZU</div>
          <p className="username">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
