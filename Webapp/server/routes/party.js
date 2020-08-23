const express = require('express')
const router = express.Router()

const config = require('../config/serverConfig')
const controller = require('../controllers/party')
const isAuthen = require('../utils/authenticated')
const apiConfig = config.getServiceConfig('partyAPI')
const passport = require('passport')

router.prefix = apiConfig.prefix

router.get(apiConfig.function.all, isAuthen, controller.getAll)
router.post(apiConfig.function.create, isAuthen, controller.create)
router.post(apiConfig.function.join, isAuthen, controller.join)
router.post(apiConfig.function.leave, isAuthen, controller.leave)

// router.get(apiConfig.function.test, controller.test)
// router.post(apiConfig.function.signup, controller.signup)
// router.post(apiConfig.function.signin, controller.signin)

module.exports = router
