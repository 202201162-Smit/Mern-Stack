// admin_router.js
const express = require("express");
const router = express.Router();
const data = require("../controllers/admin_controller");
const authmiddleware = require("../Middlewares/auth-middleware")
const adminmiddleware = require("../Middlewares/admin-middleware")
// const allservices = require("../controllers/admin_controller");

// Define the route to get all users
router.route("/users").get(authmiddleware, adminmiddleware, data.getAllUsers);

router.route("/users/:id").patch(authmiddleware, adminmiddleware, data.getuserbyId);

router.route("/users/delete/:id").delete(authmiddleware, adminmiddleware, data.deleteUserbyId);

router.route("/users/update/:id").patch(authmiddleware, adminmiddleware, data.updateUserbyId);

router.route("/services").get(authmiddleware, data.allservices);

module.exports = router;
