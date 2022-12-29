const { DataTypes } = require("sequelize")

const db = require("../db/connection")

const User = db.define("user", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  primaryKey: true,
  timestamps: true
})

module.exports = User