// Use pg Client for one-off DB scripts like seeding or migrations.
// Unlike Pool, Client requires manual connect() and end() control.
// Suitable when you need a single connection and full control over execution order.
// e.g. seeding.

// Import the PostgreSQL Client constructor from the pg module
const { Client } = require("pg");

// Load .env file with hidden setup info
const dotenv = require("dotenv");
dotenv.config();

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  // OR
  // connectionString: `postgresql://${process.env.DB_USER}:<${process.env.DB_PASSWORD}>@${process.env.DB_HOST}:process.env.DB_PORT/${process.env.DB_NAME}`,
});

module.exports = client;
