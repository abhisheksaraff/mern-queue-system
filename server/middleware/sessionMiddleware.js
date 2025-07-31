// Load session middleware. Allows Expres to store session date between requests
const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config();


// Session Management with 2 strategies: user and admin
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
});

module.exports = sessionMiddleware;
