const pool = require("./pool");

// Login Queries
const getUserByID = async (userID) => {
  const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [
    userID,
  ]);
  return rows[0];
};

const getUserInfo = async (userID) => {
  const { rows } = await pool.query(`SELECT id, name FROM users WHERE id = $1`, [
    userID,
  ]);

  return rows[0];
};

// Queue Interaction Queries
const checkUserAlreadyInQueue = async (userID, departmentID) => {
  const rows = await pool.query(
    `SELECT * FROM queues WHERE user_id = $1 AND department_id = $2 AND status = 'WAITING'`,
    [userID, departmentID]
  );
  return rows.rowCount > 0;
};

const postUserToQueue = async (userID, departmentID) => {
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

const deleteUserFromQueue = async (userID, departmentID) => {
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
  getUserInfo,
  checkUserAlreadyInQueue,
  postUserToQueue,
  deleteUserFromQueue,
};
