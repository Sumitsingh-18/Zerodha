const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true }, // E.164 format (+911234567890)
    name:  { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    // you can add fields later (kyc, etc.)
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
