// Create express app
const express = require("express");
const app = express();

// Load HTTP module
const http = require("http");

// Load .env file with hidden setup info
const dotenv = require("dotenv");
dotenv.config();

// Load passport to manage login sessions
const passport = require("passport");

// Load setup configs
const socketSetup = require("./config/socketSetup");
const passportSetup = require("./delete/passportSetup");

// Load Middlewares
const corsMiddleware = require("./middleware/corsMiddleware");
const sessionMiddleware= require("./middleware/sessionMiddleware");

// Load Routers
const adminRouter = require("./routes/adminRouter");
const userRouter = require("./routes/userRouter");

// Middleware to parse URL-encoded data from HTML form submit
// We are using this to parse URL-encoded form data for Passport local strategy
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup Configs
passportSetup();
const server = http.createServer(app);
const io = socketSetup(server, sessionMiddleware, passport);
app.set("io", io); // Make io accessible in controllers

// Setup Middleware
app.use(corsMiddleware);
// app.use(sessionMiddleware);
// app.use(passport.initialize());
// app.use(passport.session());

// Setup Routes
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

app.all("/{*any}", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

server.listen(process.env.PORT || 3000, () => {
  console.log(
    `MERN Queueing Express app - listening on port ${process.env.PORT}`
  );
});
