// Use pg Pool for shared, reusable connections in the app.
// Automatically manages multiple clients for concurrent requests.
// Ideal for web servers like Express where many DB calls happen simultaneously.
// e.g. user interactions.

// Import the PostgreSQL Pool constructor from the pg module
const { Pool } = require("pg");

// Load .env file with hidden setup info
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  // OR
  // connectionString: `postgresql://${process.env.DB_USER}:<${process.env.DB_PASSWORD}>@${process.env.DB_HOST}:process.env.DB_PORT/${process.env.DB_NAME}`,
});

module.exports = pool;
