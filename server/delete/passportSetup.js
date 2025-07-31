// // Load passport to manage login sessions
// const passport = require("passport");
// const setupUserPassport = require("../middleware/userPassport");
// const setupAdminPassport = require("../middleware/adminPassport");

// // Load db queries
// const { getUserByID } = require("../db/userQueries");
// const { getAdminByID } = require("../db/adminQueries");

// const passportSetup = () => {
//   // Setup Passport strategies
//   setupUserPassport();
//   setupAdminPassport();

//   // serializeUser determines what user data to store in the session cookie.
//   // Here, we store only the user's ID and role to keep the session lightweight.
//   passport.serializeUser(async (user, done) => {
//     done(null, { id: user.id, role: user.role });
//   });

//   // deserializeUser uses the data stored in the session (ID and role)
//   // to retrieve the full user object from the database on each request.
//   // The retrieved user is then attached to req.user for use in route handlers.
//   passport.deserializeUser(async (user, done) => {
//     try {
//       let result;
//       // Find if the user belongs to regular users or admins
//       if (user.role === "admin") result = await getAdminByID(user.id);
//       else result = await getUserByID(user.id);

//       // Passport attaches this result to req.user
//       done(null, result);
//     } catch (err) {
//       done(err);
//     }
//   });
// };

// module.exports = passportSetup;
