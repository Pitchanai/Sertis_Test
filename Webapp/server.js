const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const path = require('path')
const config = require('./server/config/serverConfig')

const app = express()

app.set('port', config.port)
app.set('trust proxy', 1)

require('./server/middlewares')(app)
require('./server/routes')(app)

if (!module.parent) {
  var server = http.createServer(app)
  server.listen(app.get('port'), () => {
    console.log('listening on port', app.get('port'))
  })
}

// MongoDB
mongoose.connect(config.mongo.connection)

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/build'))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/build/index.html'))
})
