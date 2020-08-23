const config = require('../config/serverConfig')
const Category = require('../models/categories')
const Card = require('../models/card')

const controller = {}

const ObjectId = require('mongoose').Types.ObjectId

/**
 * @description Get all categories
 */

controller.getAllCategories = async(req, res, next) => {
  try {
    let allCategories = await Category.find({})
    res.json({success: true, body: allCategories})
  } catch (err) {
    console.log('err', err)
    throw err
  }
}

controller.getCard = async(req, res, next) => {
  try {
    let allCards = await Card.find({}).populate('category')
    let returnBody = allCards.map(card => {
      let jsonCard = card.toJSON()
      jsonCard.isOwner = jsonCard.owner == req.session.user._id
      delete jsonCard.owner
      return jsonCard
    })
    
    res.json({success: true, body: returnBody})
  } catch (err) {
    console.log('err getCard', err)
    throw err
  }
}

/**
 * 
 * @param {string} category ObjectID of category
 * @param {string} name FullName from input
 * @param {string} status Status from input
 * @param {string} content Content from input
 */
controller.createCard = async(req, res, next) => {
  try {
    if (!req.body.category && !req.body.name && !req.body.status && !req.body.content) {
      res.json({success: false, message: 'No category or name or status or content.'})
      return
    }

    let category = await Category.find({_id: req.body.category})
    if (!category) {
      res.json({success: false, message: 'category not found.'})
      return
    }

    let newCard = new Card({
      owner: req.session.user._id,
      name: req.body.name,
      status: req.body.status,
      content: req.body.content,
      category: req.body.category,
    })

    await newCard.save()
    res.json({ success: true })
    return

  } catch (err) {
    console.log('err createCard', err)
    throw err
  }
}

module.exports = controller
