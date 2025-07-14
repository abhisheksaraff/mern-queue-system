const client = require("./db/client");
const bcrypt = require("bcryptjs");

const dotenv = require("dotenv");
dotenv.config();

const dropAllTablesSQL = `
DROP TABLE IF EXISTS queues;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS admins;
`;

const createAdminsTableSQL = `
CREATE TABLE IF NOT EXISTS admins (
  id VARCHAR(20) PRIMARY KEY,
  type VARCHAR(50),
  name VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
`;

const createUsersTableSQL = `
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(20) PRIMARY KEY,
  type VARCHAR(50),
  name VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
`;

const createDepartmentsTableSQL = `
CREATE TABLE IF NOT EXISTS departments(
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL UNIQUE,
  open_time_mon TIME,
  close_time_mon TIME,
  open_time_tue TIME,
  close_time_tue TIME,
  open_time_wed TIME,
  close_time_wed TIME,
  open_time_thu TIME,
  close_time_thu TIME,
  open_time_fri TIME,
  close_time_fri TIME,
  open_time_sat TIME,
  close_time_sat TIME,
  open_time_sun TIME,
  close_time_sun TIME
);
`;

const createQueuesTableSQL = `
CREATE TABLE IF NOT EXISTS queues (
  department_id INT NOT NULL,
  user_id VARCHAR(20) NOT NULL,
  admin_id VARCHAR(20),
  date DATE NOT NULL,
  time_wait_started TIME NOT NULL,
  status VARCHAR(10) CHECK (status IN ('WAITING', 'CALLED', 'COMPLETED', 'NOSHOW', 'RESCINDED')),
  time_completed TIME,
  PRIMARY KEY (department_id, user_id, date, time_wait_started),
  FOREIGN KEY (department_id) REFERENCES departments(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (admin_id) REFERENCES admins(id)
);
`;

const insertAdminSQL = `
INSERT INTO admins (id, type, name, password) VALUES ($1, $2, $3, $4)
ON CONFLICT (id) DO NOTHING
`;

const insertUserSQL = `
INSERT INTO users (id, type, name, password) VALUES ($1, $2, $3, $4)
ON CONFLICT (id) DO NOTHING
`;

const insertDepartmentsSQL = `
INSERT INTO departments (
  id,
  name,
  open_time_mon, close_time_mon,
  open_time_tue, close_time_tue,
  open_time_wed, close_time_wed,
  open_time_thu, close_time_thu,
  open_time_fri, close_time_fri,
  open_time_sat, close_time_sat,
  open_time_sun, close_time_sun
) VALUES (
  $1, $2, $3, $4, $5, $6, $7,
  $8, $9, $10, $11, $12, $13,
  $14, $15, $16
)
ON CONFLICT (id) DO NOTHING;
`;

const insertIntoQueueSQL = `
  INSERT INTO queues (user_id, department_id, date, time_wait_started, status)
  VALUES ($1, $2, $3, $4, $5)
  ON CONFLICT (department_id, user_id, date, time_wait_started) DO NOTHING
`;

async function dropAllTables() {
  await client.query(dropAllTablesSQL);
}

async function createAdminTable() {
  await client.query(createAdminsTableSQL);
}

async function createUserTable() {
  await client.query(createUsersTableSQL);
}

async function createDepartmentsTable() {
  await client.query(createDepartmentsTableSQL);
}

async function createQueuesTable() {
  await client.query(createQueuesTableSQL);
}

async function addAdmins() {
  for (let i = 1; i <= 4; i++) {
    const id = `${process.env.ADMIN_ID}${i}`;
    const name = `name${i}`;
    const type = "admin";
    const plainPassword = `password${i}`;
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await client.query(insertAdminSQL, [id, type, name, hashedPassword]);
  }
}

async function addUsers() {
  for (let i = 1; i <= 20; i++) {
    const id = `${process.env.USER_ID}${i}`;
    const name = `name${i}`;
    const type = "user";
    const plainPassword = `password${i}`;
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await client.query(insertUserSQL, [id, type, name, hashedPassword]);
  }
}

async function addDepartments() {
  for (let i = 1; i <= 10; i++) {
    const id = i;
    const name = `Department ${i}`;
    const times = [];

    if (i <= 5) {
      // Open 24/7
      for (let j = 0; j < 7; j++) {
        times.push("00:00:00", "23:59:59");
      }
    } else {
      // Open 9–5 Mon–Fri, closed on weekends
      for (let j = 0; j < 5; j++) {
        times.push("09:00:00", "17:00:00");
      }
      times.push(null, null); // Saturday
      times.push(null, null); // Sunday
    }

    await client.query(insertDepartmentsSQL, [id, name, ...times]);
  }
}

async function addQueueEntries() {
  const userIDs = Array.from(
    { length: 20 },
    (_, i) => `${process.env.USER_ID}${i + 1}`
  );

  // Only 24/7 queues (past midnight)
  const departmentIDs = [1, 2, 3, 4, 5]; 
  const totalEntries = 60;
  const entries = new Set();

  while (entries.size < totalEntries) {
    const userID = userIDs[Math.floor(Math.random() * userIDs.length)];
    const departmentID = departmentIDs[Math.floor(Math.random() * departmentIDs.length)];
    const key = `${userID}-${departmentID}`;

    if (!entries.has(key)) {
      entries.add(key);

      const date = new Date().toISOString().slice(0, 10);
      const time = new Date().toTimeString().slice(0, 8);
      const status = "WAITING";

      await client.query(insertIntoQueueSQL, [userID, departmentID, date, time, status]);
    }
  }
}

async function main() {
  console.log("seeding");

  await client.connect();

  await dropAllTables();

  await createAdminTable();
  await createUserTable();
  await createDepartmentsTable();
  await createQueuesTable();

  await addAdmins();
  await addUsers();
  await addDepartments();
  await addQueueEntries();

  await client.end();

  console.log("seeding done");
}

main();
