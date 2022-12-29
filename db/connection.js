require("dotenv").config()

const { Sequelize } = require("sequelize")

const sequelize = new Sequelize(
  "THOUGHTS",
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql"
  }
)

try {
  sequelize.authenticate()
  console.log("Conexão com mysql estabelecida...")
} catch (err) {
  console.log("Erro ao conectar com o mysql: ", err)
}

module.exports = sequelize