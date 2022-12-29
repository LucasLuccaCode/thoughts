const Comment = require("../models/Comment")

module.exports = class CommentControllers {
  static async createComment(req, res) {
    const { content, thoughtId } = req.body
    const { userId } = req.session

    console.log({userId, content, thoughtId})

    try {
      const comment = await Comment.create({
        content,
        userId,
        thoughtId
      })

      res.json({ comment })
    } catch (error) {
      console.log(error)
    }
  }
}