# mern-queue-system

Sure! Here's a concise and professional `README.md` for your **MERN Queue System** with real-time updates using Socket.IO:

---

# MERN Queue System

A real-time queue management system built with the **MERN** stack (MongoDB, Express.js, React, Node.js) and **Socket.IO**. It allows users to join virtual queues and admins to manage them across multiple departments.

## Features

* ✅ Real-time queue updates with Socket.IO
* 👥 User and Admin roles
* 🧑‍💼 Multi-department queue management
* 🔒 Session-based authentication with Passport.js
* 🌐 CORS and cookie support for cross-origin auth
* 📦 Modular backend and frontend structure

## Tech Stack

* **Frontend**: React, Vite, Axios, Socket.IO Client
* **Backend**: Node.js, Express, MongoDB, Mongoose, Passport.js, Socket.IO
* **Auth**: Express-Session, Passport-Local
* **Deployment-ready**: Modular and scalable structure

## Folder Structure

```
/client         # React frontend (user/admin portals)
/server
  /controllers  # Express controllers
  /models       # Mongoose models
  /routes       # Express routes
  /config       # Passport and DB configs
  /socket       # Socket.IO setup
  app.js        # Entry point
```

## Setup Instructions

### 1. Clone Repo

```bash
git clone https://github.com/yourusername/mern-queue-system.git
cd mern-queue-system
```

### 2. Install Dependencies

**Backend:**

```bash
cd server
npm install
```

**Frontend:**

```bash
cd ../client
npm install
```

### 3. Environment Variables

Create `.env` in `/server`:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/queue-system
SESSION_SECRET=your_secret
CLIENT_URL=http://localhost:5173
```

### 4. Run the App

**Backend:**

```bash
cd server
npm run dev
```

**Frontend:**

```bash
cd client
npm run dev
```

### 5. Open in Browser

Frontend: [http://localhost:5173](http://localhost:5173)
Backend API: [http://localhost:5000/api](http://localhost:5000/api)

## API Overview

| Route           | Method | Description             |
| --------------- | ------ | ----------------------- |
| `/login`        | POST   | User/Admin login        |
| `/logout`       | POST   | Logout current session  |
| `/queue/join`   | POST   | User joins a department |
| `/queue/status` | GET    | Get queue status        |
| `/admin/update` | POST   | Admin updates queue     |

## Future Improvements

* ✅ JWT-based auth alternative
* 📱 Mobile responsive UI
* 📊 Admin dashboard with analytics
* 📍 Location-aware queue suggestions

## License

MIT License

---

Let me know if you'd like a version tailored more to **admin-user separation**, **MongoDB Atlas setup**, or **Docker deployment**.
