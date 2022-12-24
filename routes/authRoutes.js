const express = require("express")
const router = express.Router()

const AuthControllers = require("../controllers/AuthControllers")

router.route("/register")
  .get(AuthControllers.showRegisterPage)
  .post(AuthControllers.registerUser)

router.route("/login")
  .get(AuthControllers.showLoginPage)
  .post(AuthControllers.loginUser)


router.get("/logout", AuthControllers.logout)

module.exports = router