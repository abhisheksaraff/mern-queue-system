// Loads Passport.js to manage login sessions and authentication
const passport = require("passport");

// Loads LocalStrategy from Passport to let users login with username and passport
const LocalStrategy = require("passport-local").Strategy;

// Import bycrupt for password hashing
const bcrypt = require("bcryptjs");

// Load db queries
const { getUserByID } = require("../db/userQueries");

const setupUserPassport = () => {
  // Defines a custom Passport strategy named "user-local" for authenticating regular users
  // using a id and password with the local strategy. The logic checks the database
  // for the user and verifies the password.
  passport.use(
    "user-local",
    new LocalStrategy(async (id, password, done) => {
      try {
        // Get user from db
        const user = getUserByID(id);

        if (!user) return done(null, false, { message: "Incorrect Login" });

        // Match password using bcrypt
        const match = await bcrypt.compare(password, user.password);

        if (!match) return done(null, false, { message: "Incorrect Login" });

        // Add additional property to the session to keep track
        user.role = "user";

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
};

module.exports = setupUserPassport;
