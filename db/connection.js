require("dotenv").config()

const { Sequelize } = require("sequelize")

const sequelize = new Sequelize(
  "THOUGHTS",
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql"
  }
)

try {
  sequelize.authenticate()
  console.log("Conexão com mysql estabelecida...")
} catch(err){
  console.log("Erro ao conectar com o mysql: ", err)
}

module.exports = sequelize