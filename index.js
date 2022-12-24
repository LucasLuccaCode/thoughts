const express = require("express")
const exphbs = require("express-handlebars")

const app = express()
const PORT = 3000

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

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))