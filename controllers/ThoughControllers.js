const { Op } = require("sequelize")

// Models
const Thought = require("../models/Thought")
const User = require("../models/User")

module.exports = class ThoughControllers {
  static async showThoughts(req, res) {
    
    const search = req.query.search ? req.query.search : ""
    const order = req.query.order === "old" ? "ASC" : "DESC"

    let thoughtsData = await Thought.findAll({
      where: {
        content: { [Op.like]: `%${search}%` }
      },
      include: {
        model: User,
        as: "author",
        attributes: ["name"]
      },
      order: [['createdAt', order]]
    })


    const thoughts = thoughtsData.map(thought => thought.get({ plain: true }))

    res.render("thoughts/home", { thoughts, search })
  }

  static async showDashboard(req, res) {
    try {
      const { userId } = req.session

      const user = await User.findOne({
        where: {
          id: userId
        },
        include: {
          model: Thought,
          as: "thoughts"
        },
      });

      // Check if exists user
      if (!user) return res.redirect("/login")

      const thoughts = await user.getThoughts({ raw: true })
      const emptyThoughts = !Boolean(thoughts.length)

      res.render("thoughts/dashboard", { thoughts, emptyThoughts })
    } catch (error) {
      console.log(error)
      res.status(404).json({ error })
    }
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
      content: req.body.content.trim(),
      userId: req.session.userId
    }

    try {
      await Thought.create(thought)

      res.redirect("/thoughts/dashboard")
    } catch (error) {
      console.log(error)
    }
  }

  static async showEditThought(req, res) {
    const { thoughtId } = req.params
    const { userId } = req.session

    const thought = await Thought.findOne({
      where: { id: thoughtId, userId },
      raw: true
    })

    res.render("thoughts/edit", {
      thought,
      action: `/thoughts/edit/${thoughtId}`,
      btnText: "Atualizar"
    })
  }

  static async updateThought(req, res) {
    const { thoughtId, content } = req.body
    const { userId } = req.session

    try {
      const thought = await Thought.findOne({
        where: {
          id: thoughtId,
          userId
        },
      })
      if (!thought) return res.status(404).json({ error: "Pensamento não encontrado." })

      await thought.update({ content: content.trim() })

      req.flash("success", "Pensamento atualizado!")
      req.session.save(() => res.redirect("/thoughts/dashboard"))
    } catch (error) {
      console.log(error)
    }
  }

  static async deleteThought(req, res) {
    try {
      const { thoughtId } = req.body
      const { userId } = req.session

      await Thought.destroy({ where: { id: thoughtId, userId } })
      req.flash("success", "Pensamento removido com sucesso!")
      req.session.save(() => res.redirect("/thoughts/dashboard"))
    } catch (error) {
      console.log(err)
    }
  }
}