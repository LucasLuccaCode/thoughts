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

// Flash messages
app.use(flash())

// Middlewares
// Session
const sessionMiddleware = require("./middlewares/sessionMiddleware")
app.use(sessionMiddleware)

// Set session to res
const setSessionMiddleware = require("./middlewares/setSessionMiddleware")
app.use(setSessionMiddleware)

// Auth routes 
const authRoutes = require("./routes/authRoutes")
app.use("/", authRoutes)

// Thoughts routes 
const thoughtRoutes = require("./routes/thoughtRoutes")
app.use("/thoughts", thoughtRoutes)

// Though controllers
const ThoughControllers = require("./controllers/ThoughControllers")

// Root route
app.get("/", ThoughControllers.showThoughts)

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
