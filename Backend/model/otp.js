const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema(
  {
    phone: { type: String, index: true, required: true },
    codeHash: { type: String, required: true },
    // when this time passes, MongoDB deletes the doc automatically
    expiresAt: { type: Date, required: true, index: true },
    attempts: { type: Number, default: 0 },
    purpose: { type: String, default: "signup" }
  },
  { timestamps: true }
);

// TTL index: delete as soon as expiresAt has passed
OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Otp", OtpSchema);
