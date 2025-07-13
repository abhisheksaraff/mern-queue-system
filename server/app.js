// Create express app
const express = require("express");
const app = express();

// Load .env file with hidden setup info
const dotenv = require("dotenv");
dotenv.config();

// Middleware to parse URL-encoded data from HTML form submit.
// We are using this to parse URL-encoded form data for Passport local strategy.
app.use(express.urlencoded({ extended: true }));

// Routers
const adminRouter = require("./routes/adminRouter");
const userRouter = require("./routes/userRouter");

// Routes
app.use("/admin", adminRouter);
app.use("/", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Recipes Express app - listening on port ${process.env.PORT}`);
});
