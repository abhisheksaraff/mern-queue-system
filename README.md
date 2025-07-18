---

# Queue System

A real-time queue management system using the (PostgreSQL, Express, React, Node.js) with **Socket.IO**. It supports department-based queues, role-based login (admin/user), and secure session-based authentication.

---

## 🚀 Features

* Real-time queue updates via Socket.IO
* Admin & User login with session-based auth
* Join/leave queue per department
* Admin actions: call next, update status, view all users
* Middleware-protected route logic
* Scalable and modular backend

---

## 🛠️ Tech Stack

**Frontend:** React (Vite), Axios, Socket.IO Client
**Backend:** Node.js, Express.js, PostgreSQL, Mongoose, Passport.js, Socket.IO
**Auth:** Passport-Local, express-session
**Middleware:** Role-based + department validation

---

## 📁 Folder Structure

```
/client              # React frontend
/server
  /controllers       # Route logic for users/admins/departments
  /routes            # Express routers
  /models            # Mongoose schemas
  /middleware        # Auth & department middleware
  /config            # DB and passport setup
  /socket            # Socket.IO setup
  app.js             # Express entry point
```

---

## 🔧 Setup

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/mern-queue-system.git
cd mern-queue-system

# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 2. Set Environment Variables (`/server/.env`)

```env
# Database
DB_HOST
DB_USER
DB_PASSWORD
DB_NAME
DB_PORT

# Express
PORT

# URLs
URL_LOCAL
URL_DEPLOYED_ADMIN
URL_DEPLOYED_USER

# Session
SESSION_SECRET
```

### 3. Run the App

```bash
# In /server
npm run dev

# In /client
npm run dev
```

---

## 🌐 API Routes

### 👤 User Routes (`/api/user`)

| Method | Route                                     | Description               |
| ------ | ----------------------------------------- | ------------------------- |
| GET    | `/loginStatus`                            | Check user login status   |
| POST   | `/login`                                  | User login                |
| POST   | `/logout`                                 | User logout               |
| GET    | `/userInfo`                               | Get current user info     |
| GET    | `/departments`                            | List all departments      |
| GET    | `/departments/:departmentID`              | Get department info       |
| GET    | `/departments/:departmentID/status`       | Is user already in queue? |
| GET    | `/departments/:departmentID/usersAhead`   | See users ahead in queue  |
| GET    | `/departments/:departmentID/queue-status` | Get live queue status     |
| POST   | `/departments/:departmentID/join`         | Join department queue     |
| DELETE | `/departments/:departmentID/leave`        | Leave department queue    |
| ALL    | `/{*any}`                                 | Catch-all 404             |

### 🧑‍💼 Admin Routes (`/api/admin`)

| Method | Route                                        | Description                              |
| ------ | -------------------------------------------- | ---------------------------------------- |
| GET    | `/loginStatus`                               | Check admin login status                 |
| POST   | `/login`                                     | Admin login                              |
| POST   | `/logout`                                    | Admin logout                             |
| GET    | `/adminInfo`                                 | Get current admin info                   |
| GET    | `/departments`                               | List all departments                     |
| GET    | `/departments/:departmentID`                 | Get department info                      |
| GET    | `/departments/:departmentID/users`           | List all users in queue                  |
| GET    | `/departments/:departmentID/nextUser`        | Get next user in queue                   |
| PUT    | `/departments/:departmentID/:userID/:status` | Update user status (CALLED, NOSHOW etc.) |
| ALL    | `/{*any}`                                    | Catch-all 404                            |

---

## 🔐 Middleware Logic

* `requireUserAuth` / `requireAdminAuth`: Checks session identity
* `checkDepartmentExists`: Ensures valid department ID
* `checkDepartmentOpen`: Queue must be open to interact
* `checkUserInQueue` / `checkUserNotInQueue`: Prevent invalid joins/leaves

---

## 🧭 Future Enhancements

* JWT-based stateless auth
* WebSocket reconnection handling
* Admin analytics dashboard
* Rate limiting & spam protection

---

## 📜 License

MIT

---
