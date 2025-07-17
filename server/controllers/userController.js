const userQueries = require("../db/userQueries");
const departmentQueries = require("../db/departmentQueries");

const checkLoginStatus = (req) => {
  return req.isAuthenticated() && req.user.role === "user";
};

const getLoginStatus = (req, res) => {
  if (checkLoginStatus(req)) {
    return res.status(200).json({ loggedIn: true, message: "Authorized" });
  } else {
    return res.status(200).json({ loggedIn: false, message: "Unauthorized" });
  }
};

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

const postLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    else
      return res.status(200).json({ loggedOut: true, message: "Logged Out" });
  });
};

const getUserInfo = async (req, res) => {
  const userID = req.user.ID;
  const user = await userQueries.getUserInfo(userID);
  return res.status(200).json({ message: "Authorized", user });
};

// Queue Interaction Controllers
const checkUserAlreadyInQueue = async (req, res) => {
  const departmentID = req.params.departmentID;
  const userID = req.user.id;

  const userAlreadyInQueue = await userQueries.checkUserAlreadyInQueue(
    userID,
    departmentID
  );

  if (userAlreadyInQueue) {
    return res.status(200).json({ inQueue: true });
  }

  res.status(200).json({ inQueue: false });
};

const getUsersAheadInQueue = async (req, res) => {
  const departmentID = req.params.departmentID;
  const userID = req.user.id;

  const users = await departmentQueries.getAllUsersInQueue(departmentID);
  const index = rows.findIndex((users) => users.user_id === userID);

  if (index === -1) {
    return res.status(200).json({
      inQueue: false,
      usersBefore: users.length,
      message: "Authorized",
    });
  }

  return res.status(200).json({ inQueue: true, usersBefore: index });
};

const postUserToQueue = async (req, res) => {
  const departmentID = req.params.departmentID;
  const userID = req.user.id;

  const result = await userQueries.postUserToQueue(userID, departmentID);

  return res.status(200).json({
    loggedIn: true,
    message: "User added to queue",
  });
};

const deleteUserFromQueue = async (req, res) => {
  const departmentID = req.params.departmentID;
  const userID = req.user.id;

  const result = await userQueries.deleteUserFromQueue(userID, departmentID);

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
  getLoginStatus,
  postLogout,
  getUserInfo,
  checkUserAlreadyInQueue,
  getUsersAheadInQueue,
  postUserToQueue,
  deleteUserFromQueue,
  routeNotFound,
};
