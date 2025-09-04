// import React from "react";

// const Apps = () => {
//   return <h1>Apps</h1>;
// };

// export default Apps;



import React, { useEffect, useState } from "react";
import "./Apps.css";

const Apps = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStocks = async () => {
    try {
      const res = await fetch("http://localhost:3001/apps"); // Your backend API
      const data = await res.json();
      setStocks(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching stock data:", err);
    }
  };

  useEffect(() => {
    fetchStocks(); // Initial fetch
    const interval = setInterval(fetchStocks, 10000); // Refresh every 10s
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading stocks...</h2>;

  return (
    // <div className="stock-page">
    //   <h1>📈 Live Stock Prices</h1>
    //   <div className="stock-container">
    //     {stocks.map((stock, index) => {
    //       const changeClass =
    //         stock.change >= 0 ? "change-positive" : "change-negative";

    //       return (
    //         <div key={index} className="stock-card">
    //           <div className="stock-header">
    //             <span>
    //               {stock.name} ({stock.symbol})
    //             </span>
    //             <span className={changeClass}>
    //               {stock.change.toFixed(2)} ({stock.changePercent})
    //             </span>
    //           </div>
    //           <div className="stock-info">
    //             <span>💰 Price: ₹{stock.price}</span>
    //             <span>🔼 Open: ₹{stock.open}</span>
    //             <span>📈 High: ₹{stock.high}</span>
    //             <span>📉 Low: ₹{stock.low}</span>
    //             <span>⬅️ Prev Close: ₹{stock.prevClose}</span>
    //           </div>
    //           <div className="action-buttons">
    //             <button className="btn buy-btn">Buy</button>
    //             <button className="btn sell-btn">Sell</button>
    //           </div>
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>


    <div className="stock-list">
  {stocks.map((stock) => (
    <div className="stock-row" key={stock.symbol}>
      <div className="stock-name">{stock.name}</div>
      <div className="stock-price">₹{stock.price}</div>
      <div className="stock-open">Open: ₹{stock.open}</div>
      <div className="stock-close">Close: ₹{stock.prevClose}</div>
      <div 
        className={`stock-change ${stock.change >= 0 ? "change-positive" : "change-negative"}`}
      >
        {stock.changePercent}
      </div>
      <div className="action-buttons">
        <button className="btn buy-btn">Buy</button>
        <button className="btn sell-btn">Sell</button>
      </div>
    </div>
  ))}
</div>



  );
};

export default Apps;
