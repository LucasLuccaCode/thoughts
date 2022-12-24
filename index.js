const express = require("express")
const exphbs = require("express-handlebars")
const flash = require("express-flash")

const app = express()
const PORT = 3000

// Connection with mysql
const connection = require("./db/connection")

// Models 
const User = require("./models/User")
const Thought = require("./models/Thought")

// Template engine
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

// Handle form and json data coming in request
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Public path
app.use(express.static("public"))

// Session
const session = require("./config/session")
app.use(session)

// Flash messages
app.use(flash())

// Set session to res
const setSessionMiddleware = require("./middlewares/setSessionMiddleware")
app.use(setSessionMiddleware)

// Root route
app.get("/", (req, res) => {
  res.render("home")
})

// 404 route
app.use("*", (req, res) => {
  res.status(404).render("404")
})

// Sync settings and models with database
connection
  // .sync({ force: true }) // Forçar a recriar tabelas e relacionamentos
  .sync()
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.log(err))
