
//---------------------------------------------------------------------



// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");

// const app = express();
// app.use(cors());

// const API_KEY = "ALPHA_VANTAGE_KEY"; // Replace with your key

// // BSE symbols in Alpha Vantage format (".BSE" suffix)
// const symbols = [
//   { symbol: "INFY.BO", name: "Infosys" },
//   { symbol: "TCS.BSE", name: "Tata Consultancy Services" },
//   { symbol: "RELIANCE.NSE", name: "Reliance Industries" },
//   { symbol: "WIPRO.BSE", name: "Wipro" }
// ];

// async function fetchStock(symbol) {
//   const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
//   const { data } = await axios.get(url);

//   const quote = data["Global Quote"] || {};
//   return {
//     symbol,
//     name: symbols.find((s) => s.symbol === symbol).name,
//     price: parseFloat(quote["05. price"] || 0),
//     open: parseFloat(quote["02. open"] || 0),
//     high: parseFloat(quote["03. high"] || 0),
//     low: parseFloat(quote["04. low"] || 0),
//     prevClose: parseFloat(quote["08. previous close"] || 0),
//     change: parseFloat(quote["09. change"] || 0),
//     changePercent: quote["10. change percent"] || "0%"
//   };
// }

// app.get("/api/stocks", async (req, res) => {
//   try {
//     const results = [];

//     // Loop with delay to avoid hitting API rate limit
//     for (let stock of symbols) {
//       const data = await fetchStock(stock.symbol);
//       results.push(data);
//       await new Promise((r) => setTimeout(r, 15000)); // 15 sec delay
//     }

//     res.json(results);
//   } catch (err) {
//     console.error("Stock fetch error:", err.message);
//     res.status(500).json({ error: "Error fetching stock data" });
//   }
// });

// app.listen(4000, () => {
//   console.log("✅ Server running on port 4000");
// });

//--------------------------------------------------------------------------------------




// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");

// const app = express();
// app.use(cors());

// const API_KEY = "ALPHA_VANTAGE_KEY"; // Replace with your key

// // BSE symbols in Alpha Vantage format (".BSE" suffix)
// const symbols = [
//   { symbol: "INFY.BSE", name: "Infosys" },
//   { symbol: "TCS.BO", name: "Tata Consultancy Services" },
//   { symbol: "RELIANCE.BO", name: "Reliance Industries" },
//   { symbol: "WIPRO.BSE", name: "Wipro" },
//   { symbol: "IBM.BSE", name: "IBM" }
// ];

// // Cache object
// let cacheData = null;
// let cacheTime = null;
// const CACHE_DURATION = 60 * 1000; // 1 minute

// async function fetchStock(symbol) {
//   const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
//   const { data } = await axios.get(url);

//   const quote = data["Global Quote"] || {};
//   return {
//     symbol,
//     name: symbols.find((s) => s.symbol === symbol).name,
//     price: parseFloat(quote["05. price"] || 0),
//     open: parseFloat(quote["02. open"] || 0),
//     high: parseFloat(quote["03. high"] || 0),
//     low: parseFloat(quote["04. low"] || 0),
//     prevClose: parseFloat(quote["08. previous close"] || 0),
//     change: parseFloat(quote["09. change"] || 0),
//     changePercent: quote["10. change percent"] || "0%"
//   };
// }

// app.get("/api/stocks", async (req, res) => {
//   try {
//     // If cache is still valid, return it
//     if (cacheData && (Date.now() - cacheTime) < CACHE_DURATION) {
//       console.log("📦 Returning cached data");
//       return res.json(cacheData);
//     }

//     console.log("🌐 Fetching fresh data from Alpha Vantage...");
//     const results = [];

//     // Fetch one by one with delay to avoid API limit
//     for (let stock of symbols) {
//       const data = await fetchStock(stock.symbol);
//       results.push(data);
//       await new Promise((r) => setTimeout(r, 15000)); // 15 sec delay
//     }

//     // Save to cache
//     cacheData = results;
//     cacheTime = Date.now();

//     res.json(results);
//   } catch (err) {
//     console.error("Stock fetch error:", err.message);
//     res.status(500).json({ error: "Error fetching stock data" });
//   }
// });

// app.listen(5000, () => {
//   console.log("✅ Server running on port 5000");
// });



//----------------------------------------

// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");

// const app = express();
// app.use(cors());

// const API_KEY = "ALPHA_VANTAGE_KEY"; // Replace with your key

// const stocks = [
//   { symbol: "INFY.BSE", name: "Infosys" },
//   { symbol: "TCS.BSE", name: "Tata Consultancy Services" },
//   { symbol: "RELIANCE.BSE", name: "Reliance Industries" },
//   { symbol: "WIPRO.BSE", name: "Wipro" }
// ];

// async function fetchStock(stock) {
//   try {
//     const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.symbol}&apikey=${API_KEY}`;
//     const { data } = await axios.get(url);

//     const quote = data["Global Quote"];

//     if (!quote) {
//       return { symbol: stock.symbol, name: stock.name, error: "No data" };
//     }

//     const price = parseFloat(quote["05. price"]) || 0;
//     const prevClose = parseFloat(quote["08. previous close"]) || 0;
//     const change = (price - prevClose).toFixed(2);
//     const changePercent = prevClose
//       ? ((change / prevClose) * 100).toFixed(2) + "%"
//       : "0%";

//     return {
//       symbol: stock.symbol,
//       name: stock.name,
//       price,
//       open: parseFloat(quote["02. open"]) || 0,
//       high: parseFloat(quote["03. high"]) || 0,
//       low: parseFloat(quote["04. low"]) || 0,
//       prevClose,
//       change,
//       changePercent
//     };
//   } catch (err) {
//     console.error(`Error fetching ${stock.symbol}:`, err.message);
//     return { symbol: stock.symbol, name: stock.name, error: "Failed to fetch" };
//   }
// }

// app.get("/api/stocks", async (req, res) => {
//   const results = await Promise.all(stocks.map(fetchStock));
//   res.json(results);
// });

// app.listen(5000, () => {
//   console.log("✅ Server running at http://localhost:5000");
// });


//--------------------------------------------------------------------------


// const express = require("express");
// const cors = require("cors");
// const stockAPI = require("stock-market-india");

// const app = express();
// app.use(cors());

// app.get("/api/bse-stocks", async (req, res) => {
//   try {
//     // Set up a local stock server instance for BSE
//     const server = stockAPI.createServer();

//     // Define the BSE stock codes you want
//     const codes = ["INFY", "TCS", "RELIANCE", "WIPRO"];

//     // Fetch quote information for each code
//     const fetches = codes.map(symbol =>
//       server.bse.get_quote_info({ companyName: symbol })
//     );

//     const results = await Promise.all(fetches);

//     // Format responses
//     const data = results.map((result, index) => ({
//       symbol: codes[index],
//       name: result.companyName,
//       lastTradedPrice: result.lastPrice,
//       dayHigh: result.dayHigh,
//       dayLow: result.dayLow,
//       change: result.change,
//       changePercent: result.changePercent
//     }));

//     res.json(data);
//   } catch (err) {
//     console.error("Error fetching BSE data:", err.message);
//     res.status(500).json({ error: "Failed to fetch BSE stock data" });
//   }
// });

// app.listen(5000, () => console.log("Server running on http://localhost:5000"));



//---------------------------------------------------------------



