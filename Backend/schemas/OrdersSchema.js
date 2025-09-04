// const { Schema } = require("mongoose");

// const OrdersSchema = new Schema ({
//     name: String,
//     qty: Number,
//     price: Number,
//     mode: String,
//     user: {                       // 👈 add this
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   }
// });

// module.exports = { OrdersSchema };

const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrdersSchema = new Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  mode: { type: String, enum: ["BUY", "SELL"], required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: String
}, { timestamps: true });

module.exports = { OrdersSchema };
