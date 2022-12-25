module.exports = (req, res, next) => {
  const userId = req.session.userId
  if(!userId){
    res.redirect("/login")
    return
  }
  next()
}