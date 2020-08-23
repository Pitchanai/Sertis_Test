const config = require('../config/serverConfig')
const session = require('express-session')
const redis = require('redis')
const redisStore = require('connect-redis')(session)

let sessionStore
let redisClient

redisClient = redis.createClient(config.redis.port, config.redis.host)
sessionStore = new redisStore({client: redisClient})

module.exports = sessionStore