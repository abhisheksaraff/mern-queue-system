const pool = require("./pool");

const getDepartmentList = async () => {
  const { rows } = await pool.query(`SELECT * FROM departments;`);
  return rows;
};

const getDepartmentInfo = async (departmentID) => {
  const { rows } = await pool.query(`SELECT * FROM departments WHERE id = $!`, [
    departmentID,
  ]);
  return rows[0];
};

const getDepartmentTodaySchedule = async (departmentID) => {
    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const now = new Date();
    const dayKey = days[now.getDay()];

    const query = `
    SELECT open_time_${dayKey} AS open_time, close_time_${dayKey} AS close_time
    FROM departments
    WHERE id = $1
  `;

    const { rows } = await pool.query(query, [departmentID]);

    return rows[0];
};

const getAllUsersInQueue = async (departmentID) => {
  const { rows } = await pool.query(
    `SELECT * FROM queues WHERE department_id = $1 AND status = 'WAITING'`,
    [departmentID]
  );
  return rows;
};

const getUsersCountInQueue = async (departmentID) => {
  const { rows } = await pool.query(
    `SELECT * FROM queues WHERE department_id = $1 AND status = 'WAITING'`,
    [departmentID]
  );
  return rows.rowCount;
};

module.exports = {
  getDepartmentList,
  getDepartmentInfo,
  getDepartmentTodaySchedule,
  getAllUsersInQueue,
  getUsersCountInQueue,
};
