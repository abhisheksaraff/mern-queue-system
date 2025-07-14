// Create a new Express router instance for user routes
const { Router } = require("express");
const userRouter = Router();

const userController = require("../controllers/userController");

// Login Routes
userRouter.get("/loginStatus", userController.getLoginStatus);
userRouter.post("/login", userController.postLogin);
userRouter.post("/logout", userController.requireUserAuth, userController.postLogout);

// Department Info Routes
userRouter.get("/departments", userController.requireUserAuth, userController.getDepartmentsList);
userRouter.get("/departments/:departmentID", userController.requireUserAuth, userController.getDepartmentInfoByID);

// User Interaction Routes
userRouter.get("/departments/:departmentID/users/", userController.requireUserAuth, userController.getUsersAheadInQueueByDepartmentID);
userRouter.post("/departments/:departmentID/join", userController.requireUserAuth, userController.postUserToQueueByDepartmentID);
userRouter.delete("/departments/:departmentID/leave", userController.requireUserAuth, userController.deleteUserFromQueueByDepartmentID);

// All Undefined Routes
userRouter.all("/{*any}", userController.routeNotFound);

module.exports = userRouter;
