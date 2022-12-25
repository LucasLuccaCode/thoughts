const User = require("../models/User")
const Thought = require("../models/Thought")

module.exports = class ThoughControllers {
  static async showThoughts(req, res) {
    res.render("thoughts/home")
  }

  static async dashboard(req, res) {
    const { userId } = req.session

    const user = await User.findOne({
      where: {
        id: userId
      },
      include: Thought,
      plain: true,
    });
    
    // Check if exists user
    if (!user) {
      res.redirect("/login")
    }

    // Treat thoughts
    const thoughts = user.Thoughts.map( result => result.dataValues)

    res.render("thoughts/dashboard", { thoughts })
  }


  static async showThoughtForm(req, res) {
    res.render("thoughts/create")
  }

  static async createThought(req, res) {
    const thought = {
      title: req.body.title,
      UserId: req.session.userId
    }

    try {
      await Thought.create(thought)
      res.redirect("/thoughts/dashboard")
    } catch (err) {
      console.log(err)
    }
  }
}