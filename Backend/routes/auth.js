const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("../auth/passport");
const Otp = require("../model/otp");
const User = require("../model/User");
const { sendSms } = require("../utils/sms");
const { normalizeToE164India } = require("../utils/phone");

const router = express.Router();

// --- helper: only allow every 60s ---
const RECENT_WINDOW_MS = 60 * 1000;

// store last send time per phone in memory (ok for dev)
const lastSend = new Map();

// POST /auth/send-otp { phone }
router.post("/send-otp", async (req, res) => {
  try {
    const phone = normalizeToE164India(req.body.phone);
    const last = lastSend.get(phone) || 0;
    if (Date.now() - last < RECENT_WINDOW_MS) {
      return res.status(429).json({ ok: false, message: "Please wait before requesting another OTP" });
    }

    // optional: block if user already exists? you asked to allow login instead, but
    // we can still send OTP for signup; you can choose to check User.exists({phone})

    // generate 6-digit code and hash
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const codeHash = await bcrypt.hash(code, 10);

    // OTP valid for 5 minutes
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // remove old OTPs for this phone, then save new
    await Otp.deleteMany({ phone });
    await Otp.create({ phone, codeHash, expiresAt, attempts: 0, purpose: "signup" });

    await sendSms(phone, `Your verification code is ${code}. It expires in 5 minutes.`);
    lastSend.set(phone, Date.now());

    // store the phone in session so we know which number is being verified
    req.session.signupPhone = phone;

    res.json({ ok: true, message: "OTP sent" });
  } catch (e) {
    res.status(400).json({ ok: false, message: e.message || "Could not send OTP" });
  }
});

// POST /auth/verify-otp { phone, otp }
router.post("/verify-otp", async (req, res) => {
  try {
    const phone = normalizeToE164India(req.body.phone);
    const { otp } = req.body;

    const record = await Otp.findOne({ phone }).sort({ createdAt: -1 });
    if (!record) return res.status(400).json({ ok: false, message: "OTP not found. Please request again." });
    if (record.expiresAt < new Date()) return res.status(400).json({ ok: false, message: "OTP expired. Request again." });
    if (record.attempts >= 5) return res.status(429).json({ ok: false, message: "Too many attempts" });

    const ok = await bcrypt.compare(otp, record.codeHash);
    if (!ok) {
      record.attempts += 1;
      await record.save();
      return res.status(400).json({ ok: false, message: "Invalid OTP" });
    }

    // success → mark verified in session; delete OTP doc
    await Otp.deleteMany({ phone });
    req.session.otpVerifiedPhone = phone;

    res.json({ ok: true, message: "OTP verified" });
  } catch (e) {
    res.status(400).json({ ok: false, message: e.message || "Verification failed" });
  }
});

// POST /auth/register { phone, name, email, password }
router.post("/register", async (req, res) => {
  try {
    const phone = normalizeToE164India(req.body.phone);
    const { name, email, password } = req.body;
    if (req.session.otpVerifiedPhone !== phone) {
      return res.status(401).json({ ok: false, message: "OTP verification required" });
    }

    const emailLower = String(email).toLowerCase();
    if (await User.findOne({ $or: [{ phone }, { email: emailLower }] })) {
      return res.status(409).json({ ok: false, message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ phone, name, email: emailLower, passwordHash });

    // log the user in (passport session)
    req.login(user, (err) => {
      if (err) return res.status(500).json({ ok: false, message: "Login after signup failed" });
      // cleanup the session flag
      delete req.session.otpVerifiedPhone;

      const { _id, name: uname, email: uemail, phone: uphone } = user;
      return res.json({ ok: true, user: { _id, name: uname, email: uemail, phone: uphone } });

  });
  } catch (e) {
    res.status(400).json({ ok: false, message: e.message || "Registration failed" });
  }
});

// POST /auth/login { username, password } (username can be email or phone)
router.post("/login", passport.authenticate("local"), (req, res) => {

    const { _id, name, email, phone } = req.user;
  res.json({ ok: true, user: { _id, name, email, phone } });

});

// GET /auth/me
router.get("/me", (req, res) => {
  if (!req.user) return res.json({ ok: false, user: null });
  const { _id, name, email, phone } = req.user;
  res.json({ ok: true, user: { _id, name, email, phone } });
});

// GET /auth/logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.clearCookie("connect.sid");
    res.json({ ok: true });
  });
});

module.exports = router;
