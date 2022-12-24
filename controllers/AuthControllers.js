const User = require("../models/User")

module.exports = class AuthControllers {
  static showRegisterPage(req, res){
    res.render("auth/register")
  }
}