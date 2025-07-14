const pool = require("./pool");

// Login Queries
const getUserByID = async (userID) => {
  const { rows } = await pool.query(`SELECT * FROM admins WHERE id = $1`, [
    userID,
  ]);
  return rows[0];
};

// User Info Queries
const getDepartmentsList = async () => {
  const { rows } = await pool.query(`SELECT * FROM departments;`);
  return rows;
};

const getAllDepartmentInfoByID = async (departmentID) => {
  const { rows } = await pool.query(`SELECT * FROM departments WHERE id = $!`, [
    departmentID,
  ]);
  return rows[0];
};

const getAllUsersByDepartmentID = async (departmentID) => {
  const { rows } = await pool.query(
    `SELECT * FROM queues WHERE department_id = $1`,
    [departmentID]
  );
  return rows;
};

// User Interaction Queries
const getUserAlreadyInQueueByDepartmentID = async (userID, departmentID) => {
  const { rows } = await pool.query(
    `SELECT * FROM queues WHERE user_id = $1 AND department_id = $2 AND status = 'WAITING'`,
    [userID, departmentID]
  );

  return rows.rowCount > 0;
};

const postUserToQueueByDepartmentID = async (userID, departmentID) => {
  const date = new Date().toISOString().slice(0, 10);
  const time = new Date().toTimeString().slice(0, 8);
  const status = "WAITING";

  const rows = await pool.query(
    `INSERT INTO queues (user_id, department_id, date, time_wait_started, status)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (department_id, user_id, date, time_wait_started) DO NOTHING`,
    [userID, departmentID, date, time, status]
  );

  return rows.rowCount > 0;
};

const deleteUserFromQueueByDepartmentID = async (userID, departmentID) => {
  const time = new Date().toTimeString().slice(0, 8);
  const status = "RESCINDED";

  const rows = await pool.query(
    `UPDATE queues
     SET status = $1, time_completed = $2
     WHERE user_id = $3 AND department_id = $4 AND status = 'WAITING'`,
    [status, time, userID, departmentID]
  );

  return rows.rowCount > 0;
};

module.exports = {
  getUserByID,
  getDepartmentsList,
  getAllDepartmentInfoByID,
  getAllUsersByDepartmentID,
  getUserAlreadyInQueueByDepartmentID,
  postUserToQueueByDepartmentID,
  deleteUserFromQueueByDepartmentID,
};
