'use strict'

module.exports = app => {
  const fs = require('fs')
  const path = require('path')
  const basename = path.basename(__filename)

  fs.readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file != basename) && (file.slice(-3) === '.js'))
    .forEach(file => {
      let route = require(path.join(__dirname, file))
      route.prefix ? app.use(route.prefix, route) : app.use(route)
    })
}