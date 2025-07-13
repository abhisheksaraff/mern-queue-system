// Create a new Express router instance for user routes
const { Router } = require("express");
const userRouter = Router();

const userController = require("../controllers/userController");

userRouter.post("/logout", async (req, res) => {
  res.redirect("/");
});

userRouter.get("/", async (req, res) => {
  res.send("User Home");
});

module.exports = userRouter;
