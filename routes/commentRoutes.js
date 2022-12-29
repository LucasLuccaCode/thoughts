const express = require("express")
const router = express.Router()

// Middleware
const checkAuthMiddleware = require("../middlewares/checkAuthMiddleware")

// Controller
const CommentControllers = require("../controllers/CommentControllers")

router.post("/", checkAuthMiddleware, CommentControllers.createComment)

module.exports = router