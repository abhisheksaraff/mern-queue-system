const adminQueries = require("../db/adminQueries");
const departmentQueries = require("../db/departmentQueries");

// Login/ Logout Controllers
const checkLoginStatus = (req) => {
  return req.isAuthenticated() && req.user.role === "admin";
};

const getLoginStatus = (req, res) => {
  return checkLoginStatus(req);
};

const getAdminInfo = async (req, res) => {
  const adminID = req.user.ID;
  const admin = await adminQueries.getAdminInfo(adminID);
  return res.status(200).json({ message: "Authorized", admin });
};

const postLogin = (req, res, next) => {
  passport.authenticate("admin-local", (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res
        .status(401)
        .json({ loggedIn: false, message: info?.message || "Unauthorized" });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ loggedIn: true, role: "admin" });
    });
  })(req, res, next);
};

const postLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    else
      return res.status(200).json({ loggedOut: true, message: "Logged Out" });
  });
};

// User Interaction Controllers
const getNextUser = async (req, res) => {
  const departmentID = req.params.departmentID;
  const adminID = req.user.id;
  const user = await adminQueries.getNextUser(departmentID);

  if (!user) {
    return res
      .status(404)
      .json({ loggedIn: true, message: "No User in Queue" });
  }

  // call user
  await adminQueries.updateUserStatus(adminID, user.id, departmentID, "CALLED");

  const io = req.app.get("io");

  // Notify the user that they’re being called
  io.to(`user_${user.id}_department_${departmentID}`).emit("user_called", {
    message: "You have been called",
    user: user,
  });

  // Notify all admins of the updated queue
  const updatedQueue = await departmentQueries.getAllUsersInQueue(departmentID);
  io.to(`admin_department_${departmentID}`).emit("queueUpdate", {
    action: "queue_refreshed",
    queue: updatedQueue,
  });

  return res.status(200).json({
    loggedIn: true,
    message: "Authenticated",
    user,
  });
};

const updateUserStatus = async (req, res) => {
  const { departmentID, userID } = req.params;
  const { status } = req.body;
  const adminID = req.user?.id;

  if (
    !["NOSHOW", "COMPLETED"].includes(
      // or , "CALLED", "RESCINDED", "WAITING"
      status.toUpperCase()
    )
  ) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const result = await adminQueries.updateUserStatusByDepartmentID(
    adminID,
    userID,
    departmentID,
    status
  );

  if (!result) {
    return res.status(404).json({ message: "User Not Found" });
  }

  io.to(`user_${user.id}_department_${departmentID}`).emit("statusUpdate", {
    status: status,
    departmentID,
  });
  // Notify all admins of the updated queue
  const updatedQueue = await departmentQueries.getAllUsers(departmentID);
  io.to(`admin_department_${departmentID}`).emit("queueUpdate", {
    action: "queue_refreshed",
    queue: updatedQueue,
  });

  return res.status(200).json({
    loggedIn: true,
    message: `User status updated to ${status}`,
  });
};

// All Other Controllers
const routeNotFound = (req, res) => {
  res.status(404).json({ message: "Admin route not found" });
};

module.exports = {
  getLoginStatus,
  getAdminInfo,
  postLogin,
  postLogout,
  getNextUser,
  updateUserStatus,
  routeNotFound,
};
