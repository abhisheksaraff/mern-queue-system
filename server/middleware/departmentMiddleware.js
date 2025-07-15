const departmentQueries = require("../db/departmentQueries");

const checkDepartmentExists = async (req, res, next) => {
  const departmentID = req.params.departmentID;

  try {
    const department = await departmentQueries.getDepartmentInfo(departmentID);

    if (!department) {
      return res.status(404).json({ message: "Department Not Found" });
    }
    req.department = department;

    next();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error checking department existence" });
  }
};

const checkDepartmentOpen = async (req, res, next) => {
  try {
    const { open_time, close_time } = await departmentQueries.getDepartmentTodaySchedule(req.params.departmentID);
    if (!open_time || !close_time) {
      return res.status(403).json({ message: "Department is closed today" });
    }

    const currentTime = new Date().toTimeString().slice(0, 8);

    if (currentTime >= open_time && currentTime <= close_time) {
      next();
    } else {
      res.status(403).json({ message: "Department is currently closed" });
    }
  } catch (error) {
    if (error.message === "Department not found") {
      return res.status(404).json({ message: "Department not found" });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  checkDepartmentExists,
  checkDepartmentOpen,
};
