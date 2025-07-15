const adminQueries = require("../db/adminQueries");

// Login/ Logout Controllers
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

const checkLoginStatus = (req) => {
  return req.isAuthenticated() && req.user.role === "admin";
};

const requireAdminAuth = (req, res, next) => {
  if (checkLoginStatus(req)) {
    next(); // Authorized, proceed to next
  } else {
    res.status(401).json({ loggedIn: false, message: "Unauthorized" });
  }
};

const getLoginStatus = (req, res) => {
  return checkLoginStatus(req);
};

const postLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    else
      return res.status(200).json({ loggedOut: true, message: "Logged Out" });
  });
};

// Department Info Controllers
const getDepartmentsList = async (req, res) => {
  const departments = await adminQueries.getDepartmentsList();
  return res
    .status(200)
    .json({ loggedIn: true, message: "Authenticated", departments });
};

const getDepartmentInfoByID = async (req, res) => {
  const departmentID = req.params.departmentID;
  const department = await adminQueries.getAllDepartmentInfoByID(departmentID);

  if (department) {
    return res
      .status(200)
      .json({ loggedIn: true, message: "Authenticated", department });
  } else {
    res.status(404).json({ loggedIn: true, message: "Department Not Found" });
  }
};

// User Interaction Controllers
const getAllUsersByDepartmentID = async (req, res) => {
  const departmentID = req.params.departmentID;
  const department = await adminQueries.getAllDepartmentInfoByID(departmentID);

  if (!department) {
    res.status(404).json({ loggedIn: true, message: "Department Not Found" });
  }

  const users = await adminQueries.getUsersByDepartmentID(departmentID);

  if (!users) {
    return res
      .status(404)
      .json({ loggedIn: true, message: "No User in Queue" });
  }

  return res
    .status(200)
    .json({ loggedIn: true, message: "Authenticated", department, users });
};

const getNextUserByDepartmentID = async (req, res) => {
  const departmentID = req.params.departmentID;
  const adminID = req.user.id;
  const department = await adminQueries.getAllDepartmentInfoByID(departmentID);

  // Department found
  if (!department) {
    return res
      .status(404)
      .json({ loggedIn: true, message: "Department Not Found" });
  }

  const user = await adminQueries.getNextUserByDepartmentID(departmentID);

  if (!user) {
    return res
      .status(404)
      .json({ loggedIn: true, message: "No User in Queue" });
  }

  // call user
  await adminQueries.updateUserStatusByDepartmentID(
    adminID,
    user.id,
    departmentID,
    "CALLED"
  );

  const io = req.app.get("io");

  // Notify the user that they’re being called
  io.to(`user_${user.id}_department_${departmentID}`).emit("user_called", {
    message: "You have been called",
    user: user,
  });

  // Notify all admins of the updated queue
  const updatedQueue = await queueQueries.getAllUsersByDepartmentID(
    departmentID
  );
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

const updateUserStatusByDepartmentID = async (req, res) => {
  const { departmentID, userID } = req.params;
  const { status } = req.body;
  const adminID = req.user?.id;

  if (
    !["NOSHOW", "COMPLETED", "CALLED", "RESCINDED", "WAITING"].includes(
      status.toUpperCase()
    )
  ) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const department = await adminQueries.getAllDepartmentInfoByID(departmentID);
  if (!department) {
    return res.status(404).json({ message: "Department Not Found" });
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
  const updatedQueue = await queueQueries.getAllUsersByDepartmentID(
    departmentID
  );
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
  requireAdminAuth,
  postLogin,
  postLogout,
  getDepartmentsList,
  getDepartmentInfoByID,
  getAllUsersByDepartmentID,
  getNextUserByDepartmentID,
  updateUserStatusByDepartmentID,
  routeNotFound,
};
