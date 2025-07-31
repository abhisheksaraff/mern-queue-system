const userQueries = require("../db/userQueries");
const adminQueries = require("../db/adminQueries");

// Import bcrypt library for password hashing
const bcrypt = require("bcryptjs");

// Loads Passport.js, a flexible authentication library.
// Used to manage login sessions and authentication strategies (like local,
// OAuth, etc.).
const passport = require("passport");

// Loads the Local Strategy from Passport.
// This lets users log in with a username and password (as opposed to Google,
// GitHub, etc.).
const LocalStrategy = require("passport-local").Strategy;

require("dotenv").config();

// This function acts a bit like a middleware
// You don’t call this function yourself, Passport calls it automatically
// during authentication.
// Passport passes in the username and password from the login form.
// It expects you to call done() when you’re done verifying the user.

const passportSetup = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "id",
        passwordField: "password",
      },
      async (id, password, done) => {
        try {
          let user;

          user = await userQueries.getUserByID(id);

          if (!user) {
            user = await adminQueries.getAdminByID(id);
            if (!user) {
              return done(null, false, { message: "Incorrect login" });
            }
          }

          //  * Using Bcrypt
          const match = await bcrypt.compare(password, user.password);
          if (!match) {
            // passwords do not match!
            return done(null, false, { message: "Incorrect login" });
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // These next two functions define what bit of information passport is
  // looking for when it creates and then decodes the cookie.
  // The reason they require us to define these functions is so that
  // we can make sure that whatever bit of data it’s looking for actually
  // exists in our Database!
  // we aren’t going to be calling these functions on our own and we just
  // need to define them, they’re used in the background by passport.

  // (1) passport.serializeUser takes a callback which contains the
  // information we wish to store in the session data.
  passport.serializeUser((user, done) => {
    console.log(user.id)
    done(null, user.id);
  });

  // (2) passport.deserializeUser is called when retrieving a session,
  // where it will extract the data we “serialized” in it then ultimately
  // attach something to the .user property of the request object (req.user)
  // for use in the rest of the request.
  passport.deserializeUser(async (id, done) => {
    try {
      console.log(id)
      let user = await userQueries.getUserByID(id);

      if (user) {
        user.role = "user";
      }
      if (!user) {
        user = await adminQueries.getAdminByID(id);
        if (!user) {
          return done(null, false, { message: "Incorrect login" });
        }
        user.role = "admin";
      }

      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};

module.exports = passportSetup;

