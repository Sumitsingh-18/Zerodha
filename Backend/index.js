require('dotenv').config();

const axios = require("axios");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const express = require("express");
const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");
const passport = require("./auth/passport");

const path = require("path");


const bodyParser = require("body-parser");
const cors = require("cors");

const ensureAuth = require("./middleware/ensureAuth");

const { HoldingsModel } = require('./model/HoldingsModel');

const { PositionsModel } = require('./model/PositionsModel');

const { OrdersModel } = require("./model/OrdersModel")



const PORT = process.env.PORT || 4000;
const uri = process.env.MONGO_URL;

const app = express();
const isProd = process.env.NODE_ENV === "production";

app.use(express.json());
app.use(cookieParser());

// app.use(cors({
//   origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
//   credentials: true
// }));

app.use(
  cors({
    origin: (origin, cb) => {
      const allowed = [
        process.env.FRONTEND_URL,
        process.env.DASHBOARD_URL,
        "http://localhost:3000",
        "http://localhost:4000",
      ];
      if (!origin || allowed.includes(origin)) return cb(null, true);
      return cb(new Error("CORS blocked: " + origin));
    },
    credentials: true,
  })
);

app.set("trust proxy", 1);

app.use(session({
  secret: process.env.SESSION_SECRET || "dev-secret",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  cookie: {
    httpOnly: true,
    sameSite: isProd ? "none" : "lax",  // none in prod, lax for local dev
    secure: isProd,              // set true when HTTPS/production
    maxAge: 7 * 24 * 60 * 60 * 1000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", require("./routes/auth"));
// app.get("/", (_, res) => res.send("API OK"));

app.use(bodyParser.json());


//-------------------------------------------

const API_KEY = "ALPHA_VANTAGE_KEY"; // Replace with your key

// BSE symbols in Alpha Vantage format (".BSE" suffix)
const symbols = [
  { symbol: "INFY.BSE", name: "Infosys" },
  { symbol: "TCS.BSE", name: "Tata Consultancy Services" },
  { symbol: "RELIANCE.BSE", name: "Reliance Industries" },
  { symbol: "WIPRO.BSE", name: "Wipro" },
  { symbol: "IBM.BSE", name: "IBM" },
  { symbol: "HDFCBANK.BSE", name: "HDFC Bank" },
  { symbol: "ICICIBANK.BSE", name: "ICICI Bank" },
  { symbol: "LT.BSE", name: "Larsen & Toubro"},
  { symbol: "MARUTI.BSE", name: "Maruti Suzuki India"},
  { symbol: "TATAMOTORS.BSE", name: "Tata Motors"},
  // { symbol: "TECHM.BSE", name: "Tech Mahindra"},
  // { symbol: "HCLTECH.BSE", name: "HCL Technologies"},
  // { symbol: "M&M.BSE", name: "Mahindra & Mahindra"},
  // { symbol: "BAJAJFINSV.BSE", name: "Bajaj"},
  // { symbol: "BHARTIARTL.BSE", name: "Bharti A"},
  // { symbol: "BPCL.BSE", name: "Bharat Petroleum"},
  // { symbol: "CHENNPETRO.BSE", name: "Chennai Petroleum"},
  // { symbol: "COALINDIA.BSE", name: "Coal India"},
  // { symbol: "DRREDDY.BSE", name: "Dr. Reddy's"},
  // { symbol: "ITC.BSE", name: "ITC"},
];

// Cache object
let cacheData = null;
let cacheTime = null;
const CACHE_DURATION = 60 * 1000; // 1 minute

async function fetchStock(symbol) {
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
  const { data } = await axios.get(url);

  const quote = data["Global Quote"] || {};
  return {
    symbol,
    name: symbols.find((s) => s.symbol === symbol).name,
    price: parseFloat(quote["05. price"] || 0),
    open: parseFloat(quote["02. open"] || 0),
    high: parseFloat(quote["03. high"] || 0),
    low: parseFloat(quote["04. low"] || 0),
    prevClose: parseFloat(quote["08. previous close"] || 0),
    change: parseFloat(quote["09. change"] || 0),
    changePercent: quote["10. change percent"] || "0%"
  };
}

app.get("/apps", async (req, res) => {
  try {
    // If cache is still valid, return it
    if (cacheData && (Date.now() - cacheTime) < CACHE_DURATION) {
      console.log("📦 Returning cached data");
      return res.json(cacheData);
    }

    console.log("🌐 Fetching fresh data from Alpha Vantage...");
    const results = [];

    // Fetch one by one with delay to avoid API limit
    for (let stock of symbols) {
      const data = await fetchStock(stock.symbol);
      results.push(data);
      await new Promise((r) => setTimeout(r, 15000)); // 15 sec delay
    }

    // Save to cache
    cacheData = results;
    cacheTime = Date.now();

    res.json(results);
  } catch (err) {
    console.error("Stock fetch error:", err.message);
    res.status(500).json({ error: "Error fetching stock data" });
  }
});

// app.listen(5000, () => {
//   console.log("✅ Server running on port 5000");
// });


//------------------------------------------

// app.get('/addHoldings', async(req, res) => {
//     let tempHoldings=[
//   {
//     name: "BHARTIARTL",
//     qty: 2,
//     avg: 538.05,
//     price: 541.15,
//     net: "+0.58%",
//     day: "+2.99%",
//   },
//   {
//     name: "HDFCBANK",
//     qty: 2,
//     avg: 1383.4,
//     price: 1522.35,
//     net: "+10.04%",
//     day: "+0.11%",
//   },
//   {
//     name: "HINDUNILVR",
//     qty: 1,
//     avg: 2335.85,
//     price: 2417.4,
//     net: "+3.49%",
//     day: "+0.21%",
//   },
//   {
//     name: "INFY",
//     qty: 1,
//     avg: 1350.5,
//     price: 1555.45,
//     net: "+15.18%",
//     day: "-1.60%",
//     isLoss: true,
//   },
//   {
//     name: "ITC",
//     qty: 5,
//     avg: 202.0,
//     price: 207.9,
//     net: "+2.92%",
//     day: "+0.80%",
//   },
//   {
//     name: "KPITTECH",
//     qty: 5,
//     avg: 250.3,
//     price: 266.45,
//     net: "+6.45%",
//     day: "+3.54%",
//   },
//   {
//     name: "M&M",
//     qty: 2,
//     avg: 809.9,
//     price: 779.8,
//     net: "-3.72%",
//     day: "-0.01%",
//     isLoss: true,
//   },
//   {
//     name: "RELIANCE",
//     qty: 1,
//     avg: 2193.7,
//     price: 2112.4,
//     net: "-3.71%",
//     day: "+1.44%",
//   },
//   {
//     name: "SBIN",
//     qty: 4,
//     avg: 324.35,
//     price: 430.2,
//     net: "+32.63%",
//     day: "-0.34%",
//     isLoss: true,
//   },
//   {
//     name: "SGBMAY29",
//     qty: 2,
//     avg: 4727.0,
//     price: 4719.0,
//     net: "-0.17%",
//     day: "+0.15%",
//   },
//   {
//     name: "TATAPOWER",
//     qty: 5,
//     avg: 104.2,
//     price: 124.15,
//     net: "+19.15%",
//     day: "-0.24%",
//     isLoss: true,
//   },
//   {
//     name: "TCS",
//     qty: 1,
//     avg: 3041.7,
//     price: 3194.8,
//     net: "+5.03%",
//     day: "-0.25%",
//     isLoss: true,
//   },
//   {
//     name: "WIPRO",
//     qty: 4,
//     avg: 489.3,
//     price: 577.75,
//     net: "+18.08%",
//     day: "+0.32%",
//   },
// ];

//     tempHoldings.forEach((item) => {
//         let newHolding = new HoldingsModel({
//             name: item.name,
//             qty: item.qty,
//             avg: item.avg,
//             price: item.price,
//             net: item.net,
//             day: item.day,
//         });

//         newHolding.save();
//     });
//     res.send("Done!");
// });

// app.get("/addPositions", async (req, res) => {
//   let tempPositions = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ];

//   tempPositions.forEach((item) => {
//     let newPosition = new PositionsModel({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss,
//     });

//     newPosition.save();
//   });
//   res.send("Done MF!");
// });


app.get('/allHoldings', async(req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get('/allPositions', async(req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

// app.post('/newOrder', async(req, res) => {
//   let newOrder = new OrdersModel({
//     name: req.body.name,
//     qty: req.body.qty,
//     price: req.body.price,
//     mode: req.body.mode,
//     user: req.user._id 
// });

// newOrder.save();

// res.send("Order created!");

// });


app.post('/newOrder', ensureAuth, async (req, res) => {
  try {
      console.log("🔥 Incoming order request:", req.body);
      console.log("👤 Current user in session:", req.user);

    const newOrder = new OrdersModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
      user: req.user._id,  // attach logged-in user
      username: req.user.name 
    });

    await newOrder.save();

     console.log("✅ Order saved for user:", req.user.name);

    res.json({ ok: true, message: "Order created!", order: newOrder });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
});

app.get('/myOrders', ensureAuth, async (req, res) => {
  try {
    const orders = await OrdersModel
      .find({ user: req.user._id })
      .populate("user", "name email");  // optional: show user info
      

    res.json({ ok: true, orders });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
});


app.use("/dashboard", express.static(path.join(__dirname, "..", "dashboard", "build")));

// Serve frontend build on "/"
app.use("/", express.static(path.join(__dirname, "..", "frontend", "build")));

// ✅ React Router fallback for dashboard (Express 5 regex fix)
app.get(/^\/dashboard(\/.*)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dashboard", "build", "index.html"));
});

// ✅ React Router fallback for frontend (catch everything except /api/*)
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
});


app.listen(PORT, () => {
    console.log("Server is running on port 4000");
    mongoose.connect(uri);
    console.log("DB connected!");
});

