const departmentQueries = require("../db/departmentQueries");

const getDepartmentsList = async (req, res) => {
  const departments = await departmentQueries.getDepartmentsList();
  return res
    .status(200)
    .json({ loggedIn: true, message: "Authenticated", departments });
};

const getDepartmentInfo = async (req, res) => {
  const departmentID = req.params.departmentID;
  const department = await departmentQueries.getAllDepartmentInfoByID(
    departmentID
  );

  if (department) {
    return res
      .status(200)
      .json({ loggedIn: true, message: "Authenticated", department });
  } else {
    res.status(404).json({ loggedIn: true, message: "Department Not Found" });
  }
};

const getIsDepartmentOpen = async (req, res) => {
  const departmentID = req.params.departmentID;

  const department = await getDepartmentInfo(departmentID);

  if (!department) {
    res.status(404).json({ loggedIn: true, message: "Department Not Found" });
  }

  const isDepartmentOpen = await departmentQueries.getIsDepartmentOpen(
    departmentID
  );

  if (isDepartmentOpen) {
    return res
      .status(200)
      .json({ departmentOpen: true, message: "Department is Open" });
  } else {
    res
      .status(200)
      .json({ department: false, message: "Department is Closed" });
  }
};

const getAllUsers = async (req, res) => {
  const departmentID = req.params.departmentID;
  const department = await departmentQueries.getAllDepartmentInfoByID(
    departmentID
  );

  if (!department) {
    res.status(404).json({ loggedIn: true, message: "Department Not Found" });
  }

  const users = await departmentQueries.getAllUsersByDepartmentID(departmentID);

  if (!users) {
    return res
      .status(404)
      .json({ loggedIn: true, message: "No User in Queue" });
  }

  return res
    .status(200)
    .json({ loggedIn: true, message: "Authenticated", department, users });
};

module.exports = {
  getDepartmentsList,
  getDepartmentInfo,
  getIsDepartmentOpen,
  getAllUsers,
};
