const express = require('express')
const router = express.Router()

const config = require('../config/serverConfig')
const controller = require('../controllers/auth')
const apiConfig = config.getServiceConfig('authAPI')
const passport = require('passport')

router.prefix = apiConfig.prefix

router.get(apiConfig.function.test, controller.test)
router.post(apiConfig.function.signup, controller.signup)
router.post(apiConfig.function.signin, controller.signin)

module.exports = router