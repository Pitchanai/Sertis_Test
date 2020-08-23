const express = require('express')
const router = express.Router()

const config = require('../config/serverConfig')
const controller = require('../controllers/card')
const isAuthen = require('../utils/authenticated')
const apiConfig = config.getServiceConfig('cardAPI')
const passport = require('passport')

router.prefix = apiConfig.prefix

router.get(apiConfig.function.category, isAuthen, controller.getAllCategories)

router.post(apiConfig.function.create, isAuthen, controller.createCard)

module.exports = router
