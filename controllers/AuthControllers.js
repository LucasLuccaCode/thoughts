const User = require("../models/User")
const bcrypt = require("bcryptjs")

// Model
const Thought = require("../models/Thought")

// Config
const renderRegisterOptions = { btnText: "Cadastrar", action: "/register", showFields: true }
const renderLoginOptions = { btnText: "Logar", action: "/login" }

module.exports = class AuthControllers {
  static showRegisterPage(req, res) {
    res.render("auth/register", renderRegisterOptions)
  }

  static logout(req, res) {
    req.session.destroy()
    res.redirect("/login")
  }

  static async registerUser(req, res) {
    const { name, email, password, confirm_password } = req.body

    // Verificar se email existe
    const existsEmail = await User.findOne({
      where: { email }
    })

    if (existsEmail) {
      req.flash("error", "Email informado já está em uso!")
      req.session.save(() => res.render("auth/register", renderRegisterOptions))
      return
    }

    // Checar senhas
    const passwordsMatch = password === confirm_password
    if (!password || !passwordsMatch) {
      req.flash("error", "As senhas não conferem!")
      req.session.save(() => res.render("auth/register", renderRegisterOptions))
      return
    }

    // Criptografar senhas
    const salt = bcrypt.genSaltSync(12)
    const passwordHash = bcrypt.hashSync(password, salt)

    // Clean up data
    const user = {
      name,
      email,
      password: passwordHash,
    }

    try {
      // Registrar usuário
      const createdUser = await User.create(user)

      // Salvar sessão do usuário
      req.session.userId = createdUser.id
      req.session.save(() => res.redirect("/thoughts/dashboard"))
    } catch (err) {
      console.log(err)
    }
  }

  static showLoginPage(req, res) {
    res.render("auth/login", renderLoginOptions)
  }

  static async loginUser(req, res) {
    const { email, password } = req.body

    // Verificar se email existe
    const user = await User.findOne({ raw: true, where: { email: email } })
    if (!user) {
      req.flash("error", "Usuário e/ou senha inválidos!")
      req.session.save(() => res.render("auth/login", renderLoginOptions))
      return
    }

    // Checar senhas
    const passwordsMatch = bcrypt.compareSync(password, user.password)
    if (!password || !passwordsMatch) {
      req.flash("error", "Usuário e/ou senha inválidos!")
      req.session.save(() => res.render("auth/login", renderLoginOptions))
      return
    }

    // Salvar sessão do usuário
    req.session.userId = user.id
    req.session.save(() => res.redirect("/thoughts/dashboard"))
  }
}