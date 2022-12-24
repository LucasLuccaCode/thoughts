const User = require("../models/User")
const Thought = require("../models/Thought")

module.exports = class ThoughControllers {
  static async showThoughts(req, res) {
    res.render("thoughts/home")
  }
}