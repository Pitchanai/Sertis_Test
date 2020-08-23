'use strict'

module.exports = app => {
  const config = require('../config/serverConfig')
  const sessionStore = require('./session')

  const helmet = require('helmet')
  const session = require('express-session')
  const bodyParser = require('body-parser')
  const cookieParser = require('cookie-parser')
  const minifyHTML = require('express-minify-html')
  const compression = require('compression')
  const passport = require('passport')

  const maxAge = config.cookie.maxAge
  let sessionOptions = {
    store: sessionStore,
    secret: config.redis.secret,
    proxy: true,
    cookie: {
      maxAge: maxAge,
      secure: true,
      httpOnly: false
    },
    saveUninitialized: false,
    resave: false
  }

  let minifyHTMLOptions = {
    override: true,
    exception_url: false,
    htmlMinifier: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  }

  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  )

  app.use(cookieParser())
  app.use(session(sessionOptions))
  app.use(minifyHTML(minifyHTMLOptions))
  app.use(helmet())
  app.use(compression())
  app.use(passport.initialize())
  app.use(passport.session())
}