const express = require("express")
const router = express.Router()

const AuthControllers = require("../controllers/AuthControllers")

router.route("/register")
  .get(AuthControllers.showRegisterPage)
  .post(AuthControllers.registerUser)

router.get("/logout", AuthControllers.logout)

module.exports = router