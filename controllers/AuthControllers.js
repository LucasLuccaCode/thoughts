const User = require("../models/User")
const bcrypt = require("bcryptjs")

module.exports = class AuthControllers {
  static showRegisterPage(req, res) {
    res.render("auth/register")
  }

  static logout(req, res){
    req.session.destroy()
    res.redirect("/login")
  }

  static async registerUser(req, res) {
    const { name, email, password, confirm_password } = req.body

    // verificar se email existe
    const existsEmail = await User.findOne({ raw: true, where: { email: email } })
    if (existsEmail) {
      req.flash("error", "Email informado já está em uso!")
      req.session.save(() => res.render("auth/register"))
      return
    }

    // checar senhas
    const passwordsMatch = password === confirm_password
    if (!password || !passwordsMatch) {
      req.flash("error", "As senhas não conferem!")
      req.session.save(() => res.render("auth/register"))
      return
    }

    // criptografar senhas
    const salt = bcrypt.genSaltSync(12)
    const passwordHash = bcrypt.hashSync(password, salt)

    // Clean up data
    const user = {
      name,
      email,
      password: passwordHash,
    }

    try {
      // registrar usuário
      const createdUser = await User.create(user, { raw: true })

      // Salvar sessão do usuário
      req.session.userId = createdUser.id
      req.session.save(() => res.redirect("/"))
    } catch (err) {
      console.log(err)
    }
  }
}