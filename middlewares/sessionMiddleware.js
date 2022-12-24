const session = require("express-session")
const FileStore = require("session-file-store")(session)
const path = require("path")
const os = require("os")

module.exports = session({
  name: "session",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new FileStore({
    logFn: () => {},
    path: path.join(os.tmpdir(), "sessions")
  }),
  cookie: {
    secure: false,
    maxAge: 360000, // 1 dia em ms
    httpOnly: true
  }
})