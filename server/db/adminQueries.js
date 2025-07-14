const pool = require("./pool");

// Login Queries
const getAdminByID = async (adminID) => {
  const { rows } = await pool.query(`SELECT * FROM admins WHERE id = $1`, [adminID]);
  return rows[0];
};

// Department Info Queries
const getDepartmentsList = async () => {
  const { rows } = await pool.query(`SELECT * FROM departments;`);
  return rows;
};

const getDepartmentInfoByID = async (departmentID) => {
  const {rows} = await pool.query(`SELECT * FROM departments WHERE id = $!`, [departmentID]);
  return rows[0];
}

const getAllUsersByDepartmentID = async (departmentID) => {
  const { rows } = await pool.query(
    `SELECT * FROM queues WHERE department_id = $1`,
    [departmentID]
  );
  return rows;
};

// User Interaction Queries
const getNextUserByDepartmentID = async (departmentID) => {
  const { rows } = await pool.query(
    `SELECT * FROM queues WHERE department_id = $1 AND STATUS = $2`,
    [departmentID, "WAITING"]
  );
  return rows[0];
};

const updateUserStatusByDepartmentID = async (adminID, userID, departmentID, status) => {
  const time = new Date().toTimeString().slice(0, 8);

  const rows = await pool.query(
    `UPDATE queues
     SET status = $1, admin_id = $2, time_completed = $3
     WHERE user_id = $4 AND department_id = $5 AND status = 'WAITING'`,
    [status, adminID, time, userID, departmentID]
  );

  // Check if query was successful
  return rows.rowCount > 0;
};

module.exports = {
  getAdminByID,
  getDepartmentsList,
  getDepartmentInfoByID,
  getAllUsersByDepartmentID,
  getNextUserByDepartmentID,
  updateUserStatusByDepartmentID,
};
