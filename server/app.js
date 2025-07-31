// Create express app
const express = require("express");

// Import bcrypt library for password hashing
const bcrypt = require("bcryptjs");

// Load .env file with hidden setup info
const dotenv = require("dotenv");
dotenv.config();

// Loads the session middleware.
const session = require("express-session");

// Load passport to manage login sessions
const passport = require("passport");

const cors = require("cors");

// Loads the Local Strategy from Passport.
const LocalStrategy = require("passport-local").Strategy;

const userQueries = require("./db/userQueries");
const adminQueries = require("./db/adminQueries");

// Load Routers
const adminRouter = require("./routes/adminRouter");
const userRouter = require("./routes/userRouter");

passport.use(
  new LocalStrategy(
    {
      usernameField: "id",
    },
    async (id, password, done) => {
      try {
        let user = await userQueries.getUserByID(id);
        if (!user) {
          if (!user) {
            user = await adminQueries.getAdminByID(id);
            if (!user) {
              return done(null, false, { message: "Incorrect login" });
            }
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

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
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

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.session());

app.use(
  cors({
    origin: [
      process.env.URL_LOCAL,
      process.env.URL_DEPLOYED_ADMIN,
      process.env.URL_DEPLOYED_USER,
    ],
    credentials: true,
  })
);

// Middleware to parse URL-encoded data from HTML form submit
// We are using this to parse URL-encoded form data for Passport local strategy
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup Routes
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

app.all("/{*any}", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `MERN Queueing Express app - listening on port ${process.env.PORT}`
  );
});
