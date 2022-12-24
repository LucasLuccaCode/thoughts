const express = require("express")
const exphbs = require("express-handlebars")
const session = require("express-session")
const FileStore = require("session-file-store")(session)
const flash = require("express-flash")

const app = express()
const PORT = 3000

// Connection with mysql
const connection = require("./db/connection")

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static("public"))

app.get("/", (req, res) => {
  res.render("home")
})

app.use("*", (req, res) => {
  res.status(404).render("404")
})

connection
  .sync()
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.log(err))
