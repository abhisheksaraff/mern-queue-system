// Create a new Express router instance for admin routes
const { Router } = require("express");
const adminRouter = Router();

const adminController = require("../controllers/adminController");

adminRouter.post("/logout", async (req, res) => {
  res.redirect("/");
});

adminRouter.get("/", async (req, res) => {
  res.send("Admin Home");
});

module.exports = adminRouter;
