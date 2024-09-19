const express = require("express")
const router = express.Router();
const data = require("../controllers/auth_controller")
const authmiddleware = require("../Middlewares/auth-middleware")

// router.route("/").get((req, res) => {
//     res.status(200).send("Welcome all to routers")
// })

// router.route("/register").get((req, res) => {
//     res.status(200).send("Welcome all to routers for registration")
// })

router.route("/").get(data.home)

router.route("/register").post(data.register)

router.route("/login").post(data.login)

router.route("/user").get(authmiddleware, data.user)

module.exports = router