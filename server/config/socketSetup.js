// Load socket for bidirectional communication
const { Server } = require("socket.io");

const socketSetup = (server, sessionMiddleware, passport) => {
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

    const userID = user.id;
    const role = user.role;

    console.log(`${role} connected: ${userID}`);

    socket.on("joinDepartment", (departmentID) => {
      if (role === "admin") {
        socket.join(`admin_department_${departmentID}`);
        socket.join(`admin_${userID}_department_${departmentID}`);
      } else {
        socket.join(`user_department_${departmentID}`);
        socket.join(`user_${userID}_department_${departmentID}`);
      }

      console.log(`${role} connected to department ${departmentID}`);
    });
  });
};

module.exports = socketSetup;