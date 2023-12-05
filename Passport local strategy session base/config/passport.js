const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      // Retrieve hashed password from database
      const hashedPassword = user.password;

      // Compare user's password against hashed password
      bcrypt.compare(password, hashedPassword, async (err, result) => {
        if (err) {
          return done(err);
        }

        if (!result) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
      });
    } catch (error) {
      done(error);
    }
  })
);

//create session id
//whenever we login it creates user id inside session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//find session info using session id
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});
