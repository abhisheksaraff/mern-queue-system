// Load Cross-Origin Resource Sharing between different domains
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const corsMiddleware = cors({
  origin: [
    process.env.URL_LOCAL,
    process.env.URL_DEPLOYED_ADMIN,
    process.env.URL_DEPLOYED_USER,
  ],
  credentials: true,
});

module.exports = corsMiddleware;
