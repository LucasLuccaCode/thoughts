const express = require("express")
const router = express.Router()

// Middleware
const checkAuthMiddleware = require("../middlewares/checkAuthMiddleware")

// Controller
const ThoughControllers = require("../controllers/ThoughControllers")

router.get("/", ThoughControllers.showThoughts)
router.get("/dashboard", checkAuthMiddleware, ThoughControllers.showDashboard)

router.route("/dashboard/add")
  .get(checkAuthMiddleware, ThoughControllers.showCreateThought)
  .post(checkAuthMiddleware, ThoughControllers.createThought)

router.route("/edit/:thoughtId")
  .get(checkAuthMiddleware, ThoughControllers.showEditThought)
  .post(checkAuthMiddleware, ThoughControllers.updateThought)

router.post("/remove", ThoughControllers.deleteThought)

module.exports = router