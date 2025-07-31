// Create a new Express router instance for user routes
const { Router } = require("express");
const userRouter = Router();

const userController = require("../controllers/userController");
const departmentController = require("../controllers/departmentController");

const userMiddleware = require("../middleware/userMiddleware");
const departmentMiddleware = require("../middleware/departmentMiddleware");

// Login Routes
userRouter.get("/loginStatus", userController.getLoginStatus);
userRouter.post("/login", userController.postLogin);

// *** User Auth Require for all routes below ***
userRouter.use(userMiddleware.requireUserAuth);

userRouter.get("/userInfo", userController.getUserInfo);
userRouter.post("/logout", userController.postLogout);

// Department Info Routes
userRouter.get("/departments", departmentController.getDepartmentsList);

// ** User Auth and DepartmentExists Require for all routes below **
userRouter.use(departmentMiddleware.checkDepartmentExists);

userRouter.get(
  "/departments/:departmentID",
  departmentController.getDepartmentInfo
);

// * User Auth, DepartmentExists and DepartmentOpen Require for all routes below *
userRouter.use(departmentMiddleware.checkDepartmentOpen);

userRouter.get(
  "/departments/:departmentID/status",
  userController.checkUserAlreadyInQueue
);
userRouter.get(
  "/departments/:departmentID/usersAhead/",
  userController.getUsersAheadInQueue
);

// User Interaction Routes
userRouter.get(
  "/departments/:departmentID/queue-status",
  userMiddleware.checkUserInQueue,
  userController.getUsersAheadInQueue
);
userRouter.post(
  "/departments/:departmentID/join",
  userMiddleware.checkUserNotInQueue,
  userController.postUserToQueue
);
userRouter.delete(
  "/departments/:departmentID/leave",
  userMiddleware.checkUserInQueue,
  userController.deleteUserFromQueue
);

// All Undefined Routes
userRouter.all("/{*any}", userController.routeNotFound);

module.exports = userRouter;
