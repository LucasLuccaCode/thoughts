const { DataTypes }= require("sequelize")

const db = require("../db/connection")

const User = require("./User")

const Thought = db.define("Thought", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  }
})

Thought.belongsTo(User)
User.hasMany(Thought)

module.exports = Thought