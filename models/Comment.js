const { DataTypes } = require("sequelize")
const db = require("../db/connection")

// Models
const Thought = require("./Thought")
const User = require("./User")

const Comment = db.define("comment", {
  content: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  primaryKey: true,
  timestamps: true
})

Thought.hasMany(Comment, {
  foreignKey: "thoughtId",
  as: "comments",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

User.hasMany(Comment, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

Comment.belongsTo(Thought, {
  foreignKey: "thoughtId",
  as: "post"
})

Comment.belongsTo(User, {
  foreignKey: "userId",
  as: "author"
})

module.exports = Comment