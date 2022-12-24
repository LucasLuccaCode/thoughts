const express = require("express")
const router = express.Router()

// Controller
const ThoughControllers = require("../controllers/ThoughControllers")

router.get("/", ThoughControllers.showThoughts)

module.exports = router