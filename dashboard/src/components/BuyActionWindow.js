import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { API_BASE } from "./config";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";


    const BuyActionWindow = ({ uid }) => {

      const { closeBuyWindow, fetchOrders } = useContext(GeneralContext); 

      const [stockQuantity, setStockQuantity] = useState(1);
      const [stockPrice, setStockPrice] = useState(0.0);


const handleBuyClick = async () => {
  try {
    const res = await axios.post(
      `${API_BASE}/newOrder`,
      {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "BUY",
      },
      { withCredentials: true } // 👈 important for cookies/session
    );

     if (res.data.ok) {
       alert("✅ Order placed successfully!");
        fetchOrders();
       closeBuyWindow();
     } else {
       alert("❌ Failed to place order: " + res.data.message);
     }
   } catch (err) {
        console.error("❌ Failed to place order:", err);
     alert("❌ Failed to place order: " + (err.response?.data?.message || err.message));
   }


};


    const handleCancelClick = () => {
     closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              // step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <Link className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;