const express = require('express')
const router = express.Router()

const config = require('../config/serverConfig')
const controller = require('../controllers/card')
const isAuthen = require('../utils/authenticated')
const apiConfig = config.getServiceConfig('cardAPI')
const passport = require('passport')

router.prefix = apiConfig.prefix

router.get(apiConfig.function.category, isAuthen, controller.getAllCategories)
router.get(apiConfig.function.status, isAuthen, controller.getAllStatus)

router.get(apiConfig.function.get, isAuthen, controller.getCard)
router.post(apiConfig.function.create, isAuthen, controller.createCard)
router.post(apiConfig.function.edit, isAuthen, controller.editCard)
router.post(apiConfig.function.delete, isAuthen, controller.deleteCard)

module.exports = router
