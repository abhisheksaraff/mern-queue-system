// Create express app
const express = require("express");
const app = express();

// Load HTTP module
const http = require("http");

// Load .env file with hidden setup info
const dotenv = require("dotenv");
dotenv.config();

// Load socket for bidirectional communication
const { Server } = require("socket.io");

// Load Cross-Origin Resource Sharing between different domains
const cors = require("cors");

// Load db queries
const { getUserByID } = require("./db/userQueries");
const { getAdminByID } = require("./db/adminQueries");

// Load session middleware. Allows Expres to store session date between requests
const session = require("express-session");

// Load passport to manage login sessions
const passport = require("passport");
const setupUserPassport = require("./middleware/userPassport");
const setupAdminPassport = require("./middleware/adminPassport");

// Middleware to parse URL-encoded data from HTML form submit
// We are using this to parse URL-encoded form data for Passport local strategy
app.use(express.urlencoded({ extended: true }));

// Session Management with 2 strategies: user and admin
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
});

app.use(sessionMiddleware);

setupUserPassport();
setupAdminPassport();

// serializeUser determines what user data to store in the session cookie.
// Here, we store only the user's ID and role to keep the session lightweight.
passport.serializeUser(async (user, done) => {
  done(null, { id: user.id, role: user.role });
});

// deserializeUser uses the data stored in the session (ID and role)
// to retrieve the full user object from the database on each request.
// The retrieved user is then attached to req.user for use in route handlers.
passport.deserializeUser(async (user, done) => {
  try {
    // Find if the user belongs to regular users or admins
    if (user.role === "admin") result = getUserByID(user.id);
    else result = await getAdminByID(user.id);

    // Passport attaches this result to req.user
    done(null, result);
  } catch (err) {
    done(err);
  }
});

app.use(passport.initialize());
app.use(passport.session());

// CORS setup
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

// Socketio setup
const server = http.createServer(app);
// Wrap session middleware for socket.io
const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);
const io = new Server(server, {
  cors: {
    origin: [
      process.env.URL_LOCAL,
      process.env.URL_DEPLOYED_ADMIN,
      process.env.URL_DEPLOYED_USER,
    ],
    credentials: true,
  },
});

io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));

io.on("connection", (socket) => {
  const user = socket.request.user;
  if (!user) return socket.disconnect();

  const departmentID = socket.handshake.query.departmentID;
  const role = user.role;

  if (role === "admin") {
    socket.join(`admin_department_${departmentID}`);
  } else {
    socket.join(`user_department_${departmentID}`);
    socket.join(`user_${user.id}`);
  }

  console.log(`${role} connected to department ${departmentID}`);
});

// Make io accessible in controllers
app.set("io", io);

// Routers
const adminRouter = require("./routes/adminRouter");
const userRouter = require("./routes/userRouter");

// Routes
app.use("/admin/api", adminRouter);
app.use("/api", userRouter);

app.all("/{*any}", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

server.listen(process.env.PORT || 3000, () => {
  console.log(
    `MERN Queueing Express app - listening on port ${process.env.PORT}`
  );
});
