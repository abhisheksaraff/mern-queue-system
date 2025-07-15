// Create a new Express router instance for admin routes
const { Router } = require("express");
const adminRouter = Router();

const adminController = require("../controllers/adminController");
const departmentController = require("../controllers/departmentController");

const adminMiddleware = require("../middleware/adminMiddleware");
const departmentMiddleware = require("../middleware/departmentMiddleware");

// Login Routes
adminRouter.get("/loginStatus", adminController.getLoginStatus);
adminRouter.post("/login", adminController.postLogin);

// *** Admin Auth Require for all routes below ***
adminRouter.use(adminMiddleware.requireAdminAuth);

adminRouter.post(
  "/logout",
  adminController.postLogout
);

// Department Info Routes
adminRouter.get(
  "/departments",
  departmentController.getDepartmentList
);

// ** Admin Auth and DepartmentExists Require for all routes below **
adminRouter.use(departmentMiddleware.checkDepartmentExists);

adminRouter.get(
  "/departments/:departmentID",
  departmentController.getDepartmentInfo
);

// * User Auth, DepartmentExists and DepartmentOpen Require for all routes below *
adminRouter.use(departmentMiddleware.checkDepartmentOpen);

// User Interaction Routes
adminRouter.get(
  "/departments/:departmentID/users/",
  departmentController.getAllUsers
);
adminRouter.get(
  "/departments/:departmentID/nextUser/",
  adminController.getNextUser
);
adminRouter.put(
  "/departments/:departmentID/:userID/:status",
  adminController.updateUserStatus
);

// All Undefined Routes
adminRouter.all("/{*any}", adminController.routeNotFound);

module.exports = adminRouter;
