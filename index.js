const express = require("express")
const exphbs = require("express-handlebars")
const flash = require("express-flash")

const app = express()
const PORT = 3000

// Sequelize connection with database
const connection = require("./db/connection")

// Models 
const User = require("./models/User")
const Thought = require("./models/Thought")
const Comment = require("./models/Comment")

// Template engine
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

// Handle form and json data coming in request
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Path for statics files
app.use(express.static("public"))

// Flash messages
app.use(flash())

// Session middleware
const sessionMiddleware = require("./middlewares/sessionMiddleware")
app.use(sessionMiddleware)

// Set session to res middleware
const setSessionMiddleware = require("./middlewares/setSessionMiddleware")
app.use(setSessionMiddleware)

// Auth routes 
const authRoutes = require("./routes/authRoutes")
app.use("/", authRoutes)

// Thoughts routes 
const thoughtRoutes = require("./routes/thoughtRoutes")
app.use("/thoughts", thoughtRoutes)

// Comment routes 
const commentRoutes = require("./routes/commentRoutes")
app.use("/comments", commentRoutes)

// Though controllers
const ThoughControllers = require("./controllers/ThoughControllers")

// Root route
app.get("/", ThoughControllers.showThoughts)

// 404 route
app.use("*", (req, res) => {
  res.status(404).render("404")
})

// Sync models schema with database
connection
  // .sync({ force: true }) // Forçar a recriar tabelas e relacionamentos
  .sync()
  .then(() => app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)))
  .catch(err => console.log(err))
