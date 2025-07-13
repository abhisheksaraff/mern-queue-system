// Create a new Express router instance for user routes
const { Router } = require("express");
const userRouter = Router();

const indexController = require("../controllers/userController");

module.exports = indexController;
