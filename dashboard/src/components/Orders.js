// import React from "react";
// import { Link } from "react-router-dom";

// const Orders = () => {
//   return (
//     <div className="orders">
//       <div className="no-orders">
//         <p>You haven't placed any orders today</p>  

//         <Link to={"/"} className="btn"> 
//           Get started    
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Orders;  


//---------------------------------------------

// import React, { useContext, useEffect } from "react";
// import GeneralContext from "./GeneralContext";

// const Orders = () => {
//   const { orders, fetchOrders } = useContext(GeneralContext);

//   useEffect(() => {
//     fetchOrders(); // fetch orders when Orders page loads
//   }, [fetchOrders]);

//   if (!orders || orders.length === 0) {
//     return (
//       <div className="no-orders">
//         <p>You haven't placed any orders today</p>
//         <button onClick={fetchOrders}>🔄 Refresh</button>
//       </div>
//     );
//   }

//   return (
//     <div className="orders">
//       <h2>My Orders</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Stock</th>
//             <th>Quantity</th>
//             <th>Price</th>
//             <th>Mode</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order) => (
//             <tr key={order._id}>
//               <td>{order.name}</td>
//               <td>{order.qty}</td>
//               <td>{order.price}</td>
//               <td>{order.mode}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Orders;

import React, { useContext, useEffect, useMemo, useState } from "react";
import GeneralContext from "./GeneralContext";

import "./orders.css"; 

const Orders = () => {
  const { orders, fetchOrders } = useContext(GeneralContext);
   const [filter, setFilter] = useState("all"); // all | BUY | SELL | pending | completed | cancelled
  const [search, setSearch] = useState("");

useEffect(() => {
    fetchOrders();
}, [fetchOrders]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (orders || []).filter((o) => {
      const byFilter =
        filter === "all" ||
        (o.mode && o.mode.toLowerCase() === filter.toLowerCase()) ||
        (o.status && o.status.toLowerCase() === filter.toLowerCase());
      const bySearch = !q || (o.name || "").toLowerCase().includes(q);
      return byFilter && bySearch;
    });
  }, [orders, filter, search]);

  console.log("Single order example:", orders[0]);
  console.log("Orders.js received orders:", orders);

  return (
        <div className="orders-page">
      {/* Header */}
      <div className="orders-header">
        <div>
          <h1 className="orders-title">My Orders</h1>
          <p className="orders-subtitle">Track and manage all your trades</p>
        </div>

        {/* Search */}
        <div className="orders-search">
          <svg className="search-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 21l-4.35-4.35M17 10.5A6.5 6.5 0 1 1 4 10.5a6.5 6.5 0 0 1 13 0Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
          <input
            className="search-input"
            type="text"
            placeholder="Search stock..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Filter chips */}
      <div className="orders-filters">
        {["all", "BUY", "SELL", "pending", "completed", "cancelled"].map((f) => (
          <button
            key={f}
            className={`filter-chip ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Table / Empty */}
      {filtered.length > 0 ? (
        <div className="orders-card">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Stock</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Mode</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o, i) => (
                <tr key={o._id || i}>
                  <td className="cell-symbol">{o.name}</td>
                  <td>{o.qty}</td>
                  <td className="cell-money">₹{o.price}</td>
                  <td>
                    <span className={`badge ${o.mode === "BUY" ? "buy" : "sell"}`}>
                      {o.mode}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        o.status === "completed"
                          ? "completed"
                          : o.status === "pending"
                          ? "pending"
                          : o.status === "cancelled"
                          ? "cancelled"
                          : "muted"
                      }`}
                    >
                      {o.status || "N/A"}
                    </span>
                  </td>
                  <td className="cell-time">
                    {o.createdAt ? new Date(o.createdAt).toLocaleString() : "--"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="orders-empty">
          <div className="empty-graphic" aria-hidden="true">
            <svg viewBox="0 0 120 80">
              <rect x="8" y="18" width="104" height="44" rx="8" className="eg-rect"/>
              <rect x="20" y="30" width="40" height="6" rx="3" className="eg-line"/>
              <rect x="20" y="42" width="80" height="6" rx="3" className="eg-line"/>
            </svg>
          </div>
          <h3>No orders yet</h3>
          <p>Place your first BUY or SELL order and it will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default Orders;