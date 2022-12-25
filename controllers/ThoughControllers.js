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
    const thoughts = user.Thoughts.map(result => result.dataValues)

    res.render("thoughts/dashboard", { thoughts })
  }


  static async showCreateThought(req, res) {
    res.render("thoughts/create", {
      thought: {},
      action: "/thoughts/dashboard/add",
      btnText: "Publicar"
    })
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

  static async showEditThought(req, res) {
    const { thoughtId } = req.params
    const UserId = req.session.userId

    const thought = await Thought.findOne({
      where: { id: thoughtId, UserId },
      raw: true
    })

    res.render("thoughts/edit", { 
      thought, 
      action: `/thoughts/edit/${thoughtId}`,
      btnText: "Atualizar"
    })
  }

  static async updateThought(req, res) {
    const { thoughtId, title } = req.body
    const UserId = req.session.userId

    const thought = {
      title
    }

    try {
      await Thought.update(thought, { where: { id: thoughtId, UserId } })
      req.flash("success", "Pensamento atualizado!")
      req.session.save(() => res.redirect("/thoughts/dashboard"))
    } catch (err) {
      console.log(err)
    }
  }

  static async deleteThought(req, res) {
    const { thoughtId } = req.body
    const UserId = req.session.userId

    await Thought.destroy({ where: { id: thoughtId, UserId } })
    req.flash("success", "Pensamento removido com sucesso!")
    req.session.save(() => res.redirect("/thoughts/dashboard"))
  }
}