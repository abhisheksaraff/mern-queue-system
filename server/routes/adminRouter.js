// Create a new Express router instance for admin routes
const { Router } = require("express");
const adminRouter = Router();

const adminController = require("../controllers/adminController");

module.exports = adminController;
