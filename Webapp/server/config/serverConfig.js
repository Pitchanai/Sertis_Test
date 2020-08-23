const dotenv = require('dotenv')
const apiConfig = require('./apiConfig')
dotenv.config()

const config = {
  port: process.env.PORT,
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    secret: process.env.SESSION_SECRET,
  },
  cookie: {
    maxAge: 24 * 60 * 60000,
  },
  mongo: {
    connection: process.env.MONGODB_CONNECTIONSTRING,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  getServiceConfig: (name) => {
    return apiConfig[name]
  },
}

module.exports = config