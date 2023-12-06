const passport = require("passport");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(async (name, password, done) => {
    try {
      const user = await User.findOne({ name: name });
      if (!user) {
        return done(null, false, { message: "Incorrect email addressa" });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// create session id
// whenever we login it creares user id inside session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// find session info using session id
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
