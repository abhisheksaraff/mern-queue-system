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

module.exports = {
    requireAdminAuth,
};