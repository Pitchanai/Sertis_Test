const config = require('../config/serverConfig')
const User = require('../models/user')

const controller = {}

/**
 * for test
 */
controller.test = async (req, res, next) => {
  try {
    console.log('req.sessions', req.session)
    res.json({success: true})
  } catch (err) {
    throw err
  }
}

/**
 * @param username signup username
 * @description password will be generate by server and send back 1 time only. If user can't remember will have to reset password (which not supported yet.)
 */
controller.signup = async (req, res, next) => {
  try {
    if (!req.body.username) {
      res.json({success: false, message: 'Please fill username.'})
      return
    }

    let existed = await User.findOne({
      username: req.body.username
    })

    if (existed) {
      res.json({success: false, message: 'Username already existed.'})
      return
    }

    const generatedPassword = req.body.username + 'pw'

    let newUser = new User({
      username: req.body.username,
      password: generatedPassword
    })
    let savedUser = await newUser.save()
    delete savedUser.password
    req.session.user = savedUser
    res.json({ success: true, body: { username: req.body.username, password: generatedPassword } })
    return
  } catch (err) {
    console.log('signup error', err)
    throw err
  }
}

/**
 * @param username signin username
 * @param password signin password
 */
controller.signin = async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.password) {
      res.json({ success: false, message: 'Please fill username and password.' })
      return
    }

    let existed = await User.findOne({
      username: req.body.username
    })

    if (!existed) {
      res.json({ success: false, message: 'Authentication error.'})
      return
    }
    
    existed.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        // let token = jwt.sign(user.toJSON(), config.jwt.secret, { expiresIn: 36000 })
        let existedMatch = existed.toJSON()
        delete existedMatch.password
        req.session.user = existedMatch
        res.json({success: true})
      } else {
        res.json({success: false})
      }
    })
  } catch (err) {
    console.log('signin error', err)
    throw err
  }
}

module.exports = controller