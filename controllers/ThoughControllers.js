const User = require("../models/User")
const Thought = require("../models/Thought")

module.exports = class ThoughControllers {
  static async showThoughts(req, res) {
console.log(req.session)

    res.render("thoughts/home")
  }
}