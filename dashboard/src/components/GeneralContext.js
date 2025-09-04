// import React, { useState } from "react";

// import BuyActionWindow from "./BuyActionWindow";

// const GeneralContext = React.createContext({
//   openBuyWindow: (uid) => {},
//   closeBuyWindow: () => {},
// });

// export const GeneralContextProvider = (props) => {
//   const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
//   const [selectedStockUID, setSelectedStockUID] = useState("");

//   const handleOpenBuyWindow = (uid) => {
//     setIsBuyWindowOpen(true);
//     setSelectedStockUID(uid);
//   };

//   const handleCloseBuyWindow = () => {
//     setIsBuyWindowOpen(false);
//     setSelectedStockUID("");
//   };

//   return (
//     <GeneralContext.Provider
//       value={{
//         openBuyWindow: handleOpenBuyWindow,
//         closeBuyWindow: handleCloseBuyWindow,
//       }}
//     >
//       {props.children}
//       {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
//     </GeneralContext.Provider>
//   );
// };

// export default GeneralContext;



//--------------------------------------------


import React, { useState, useEffect } from "react";
import BuyActionWindow from "./BuyActionWindow";

import axios from 'axios';

import { API_BASE } from "./config";

const GeneralContext = React.createContext({
  user: null,
  orders: [],
  fetchOrders: () => {},
  openBuyWindow: (uid) => {},
  closeBuyWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  // fetch current logged in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/auth/me", { credentials: "include" });
        const data = await res.json();
        if (data.ok) {
          setUser(data.user);
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };
    fetchUser();
  }, []);

   useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  // fetch orders of logged in user
const fetchOrders = async () => {
  try {
    const res = await axios.get(`${API_BASE}/myOrders`, { withCredentials: true });
    console.log("fetchOrders response:", res.data);  // 👈 log the full response
    if (res.data.ok) {
      setOrders(res.data.orders);
      console.log("Orders state updated:", res.data.orders);
    } else {
      console.error("Failed to fetch orders:", res.data.message);
    }
  } catch (err) {
    console.error("Failed to fetch orders", err);
  }
};


  const handleOpenBuyWindow = (uid) => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  return (
    <GeneralContext.Provider
      value={{
        user,
        orders,
        fetchOrders,
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
