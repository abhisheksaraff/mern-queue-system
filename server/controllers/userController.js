const userQueries = require("../db/userQueries");

const postLogin = (req, res, next) => {
  passport.authenticate("user-local", (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res
        .status(401)
        .json({ loggedIn: false, message: info?.message || "Unauthorized" });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ loggedIn: true, role: "user" });
    });
  })(req, res, next);
};

const checkLoginStatus = (req) => {
  return req.isAuthenticated() && req.user.role === "user";
};

const requireUserAuth = (req, res, next) => {
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
  const departments = await userQueries.getDepartmentsList();
  return res
    .status(200)
    .json({ loggedIn: true, message: "Authenticated", departments });
};

const getDepartmentInfoByID = async (req, res) => {
  const departmentID = req.params.departmentID;
  const department = await userQueries.getAllDepartmentInfoByID(departmentID);

  if (department) {
    return res
      .status(200)
      .json({ loggedIn: true, message: "Authenticated", department });
  } else {
    res.status(404).json({ loggedIn: true, message: "Department Not Found" });
  }
};

// User Interaction Controllers
const getUsersAheadInQueueByDepartmentID = async (req, res) => {
  const departmentID = req.params.departmentID;
  const userID = req.user.id;
  const department = await userQueries.getAllDepartmentInfoByID(departmentID);

  if (!department) {
    res.status(404).json({ loggedIn: true, message: "Department Not Found" });
  }

  const users = await userQueries.getUsersByDepartmentID(departmentID);
  const index = rows.findIndex((users) => users.user_id === userID);

  if (index === -1) {
    return res.status(200).json({ inQueue: false, usersBefore: users.length });
  }

  return res.status(200).json({ inQueue: true, usersBefore: index });
};

const postUserToQueueByDepartmentID = async (req, res) => {
  const departmentID = req.params.departmentID;
  const userID = req.user.id;

  const department = await userQueries.getAllDepartmentInfoByID(departmentID);
  if (!department) {
    return res.status(404).json({ message: "Department Not Found" });
  }

  const userAlreadyInQueue =
    await userQueries.getUserAlreadyInQueueByDepartmentID(userID, departmentID);

  if (userAlreadyInQueue) {
    return res.status(409).json({
      inQueue: true,
      message: "User already in queue",
    });
  }

  const result = await userQueries.postUserToQueueByDepartmentID(
    userID,
    departmentID
  );

  if (!result) {
    return res.status(404).json({ message: "User Not Found" });
  }

  return res.status(200).json({
    loggedIn: true,
    message: `Authorized`,
  });
};

const deleteUserFromQueueByDepartmentID = async (req, res) => {
  const departmentID = req.params.departmentID;
  const userID = req.user.id;

  const department = await userQueries.getAllDepartmentInfoByID(departmentID);
  if (!department) {
    return res.status(404).json({ message: "Department Not Found" });
  }

  const result = await userQueries.deleteUserFromQueueByDepartmentID(
    userID,
    departmentID
  );

  if (!result) {
    return res.status(404).json({ message: "User Not Found" });
  }

  return res.status(200).json({
    loggedIn: true,
    message: `User status updated to RESCINDED`,
  });
};

// All Other Controllers
const routeNotFound = (req, res) => {
  res.status(404).json({ message: "User route not found" });
};

module.exports = {
  postLogin,
  requireUserAuth,
  getLoginStatus,
  postLogout,
  getDepartmentsList,
  getDepartmentInfoByID,
  getUsersAheadInQueueByDepartmentID,
  postUserToQueueByDepartmentID,
  deleteUserFromQueueByDepartmentID,
  routeNotFound,
};
