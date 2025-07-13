// Load session middleware. Allows Expres to store session date between requests
const session = require("session");

// Loads Passport.js to manage login sessions and authentication
const passport = require("passport");

// Loads LocalStrategy from Passport to let users login with username and passport
const LocalStrategy = require("passport-local").Strategy;