const userQueries = require("../db/userQueries");

const checkLoginStatus = (req) => {
  return req.isAuthenticated() && req.user.role === "user";
};

const requireUserAuth = (req, res, next) => {
  if (checkLoginStatus(req)) {
    next();
  } else {
    res.status(401).json({ loggedIn: false, message: "Unauthorized" });
  }
};

const checkUserInQueue = async (req, res, next) => {
  const userID = req.user?.id;
  const departmentID = req.params.departmentID;

  try {
    const userAlreadyInQueue = await userQueries.checkUserAlreadyInQueue(
      userID,
      departmentID
    );

    if (!userAlreadyInQueue) {
      return res.status(409).json({
        inQueue: true,
        message: "User already in queue",
      });
    }

    next();
  } catch (error) {
    console.error("Error checking user queue status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const checkUserNotInQueue = async (req, res, next) => {
  const userID = req.user?.id;
  const departmentID = req.params.departmentID;

  try {
    const userAlreadyInQueue = await userQueries.checkUserAlreadyInQueue(
      userID,
      departmentID
    );

    if (userAlreadyInQueue) {
      return res.status(409).json({
        inQueue: true,
        message: "User already in queue",
      });
    }

    next();
  } catch (error) {
    console.error("Error checking user queue status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
    requireUserAuth,
    checkUserInQueue,
    checkUserNotInQueue,
};
