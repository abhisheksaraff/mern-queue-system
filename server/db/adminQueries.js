const pool = require("./pool");

// Login Queries
const getAdminByID = async (adminID) => {
  const { rows } = await pool.query(`SELECT * FROM admins WHERE id = $1`, [
    adminID,
  ]);
  return rows[0];
};

const getAdminInfo = async (adminID) => {
  const { rows } = await pool.query(
    `SELECT id, name FROM admins WHERE id = $1`,
    [userID]
  );

  return rows[0];
};

// User Interaction Queries
const getNextUser = async (departmentID) => {
  const { rows } = await pool.query(
    `SELECT * FROM queues WHERE department_id = $1 AND STATUS = $2`,
    [departmentID, "WAITING"]
  );
  return rows[0];
};

const updateUserStatus = async (adminID, userID, departmentID, status) => {
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
  getAdminInfo,
  getNextUser,
  updateUserStatus,
};
