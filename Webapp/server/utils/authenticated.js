module.exports = async (req, res, next) => {
  if (req.session.user) {
    console.log('session', req.session.id)
    next()
  } else {
    res.json({success: false, message: 'Not authenticated.', code: 'L001'})
  }
}