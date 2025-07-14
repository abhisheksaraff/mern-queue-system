// Create a new Express router instance for admin routes
const { Router } = require("express");
const adminRouter = Router();

const adminController = require("../controllers/adminController");

// Login Routes
adminRouter.get("/loginStatus", adminController.getLoginStatus);
adminRouter.post("/login", adminController.postLogin);
adminRouter.post("/logout", adminController.requireAdminAuth, adminController.postLogout);

// Department Info Routes
adminRouter.get("/departments", adminController.requireAdminAuth, adminController.getDepartmentsList);
adminRouter.get("/departments/:departmentID", adminController.requireAdminAuth, adminController.getDepartmentInfoByID);

// User Interaction Routes
adminRouter.get("/departments/:departmentID/users/", adminController.requireAdminAuth, adminController.getAllUsersByDepartmentID);
adminRouter.get("/departments/:departmentID/nextUser/", adminController.requireAdminAuth, adminController.getNextUserByDepartmentID);
adminRouter.put("/departments/:departmentID/:userID/:status", adminController.requireAdminAuth, adminController.updateUserStatusByDepartmentID);

// All Undefined Routes
adminRouter.all("/{*any}", adminController.routeNotFound);

module.exports = adminRouter;
