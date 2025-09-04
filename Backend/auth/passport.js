const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../model/User");

// allow user to type email or phone into a single "username" field
passport.use(new LocalStrategy(
  { usernameField: "username", passwordField: "password" },
  async (username, password, done) => {
    try {
      const q = username.includes("@")
        ? { email: username.toLowerCase() }
        : { phone: username };
      const user = await User.findOne(q);
      if (!user) return done(null, false, { message: "User not found" });
      const ok = await bcrypt.compare(password, user.passwordHash);
      if (!ok) return done(null, false, { message: "Invalid credentials" });
      return done(null, user);
    } catch (e) {
      return done(e);
    }
  }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try { done(null, await User.findById(id).lean()); }
  catch (e) { done(e); }
});

module.exports = passport;
