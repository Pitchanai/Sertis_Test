const config = require('../config/serverConfig')
const Category = require('../models/categories')
const Card = require('../models/card')
const Status = require('../models/status')

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

/**
 * @description Get all status
 */

controller.getAllStatus = async(req, res, next) => {
  try {
    let allStatus = await Status.find({})
    res.json({ success: true, body: allStatus })
  } catch (err) {
    console.log('err', err)
    throw err
  }
}

/**
 * @description Get all cards
 */
controller.getCard = async(req, res, next) => {
  try {
    let allCards = await Card.find({}).populate('category').populate('status')
    let returnBody = allCards.map(card => {
      let jsonCard = card.toJSON()
      jsonCard.createdAt = card._id.getTimestamp()
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
 * @param {string} status ObjectID of status
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

    let status = await Status.find({_id: req.body.status})
    if (!status) {
      res.json({success: false, message: 'status not found.'})
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

/**
 * @param {string} id ObjectID of this card
 * @param {string} category ObjectID of category
 * @param {string} name FullName from input
 * @param {string} status ObjectID of status
 * @param {string} content Content from input
 */
controller.editCard = async(req, res, next) => {
  try {
    if (!req.body.id && !req.body.category && !req.body.name && !req.body.status && !req.body.content) {
      res.json({success: false, message: 'No category or name or status or content.'})
      return
    }

    let card = await Card.findOne({_id: req.body.id, owner: req.session.user._id})
    if (!card) {
      res.json({success: false, message: `you're not the owner.`})
      return
    }

    let category = await Category.find({_id: req.body.category})
    if (!category) {
      res.json({success: false, message: 'category not found.'})
      return
    }

    let status = await Status.find({_id: req.body.status})
    if (!status) {
      res.json({success: false, message: 'status not found.'})
      return
    }

    console.log(card)
    
    card.name = req.body.name
    card.status = req.body.status
    card.category = req.body.category
    card.content = req.body.content

    await card.save()
    res.json({ success: true })
    return

  } catch (err) {
    console.log('err createCard', err)
    throw err
  }
}

/**
 * 
 * @param {string} id ObjectID of card
 */
controller.deleteCard = async(req, res, next) => {
  try {
    if (!req.body.id) {
      res.json({ success: false, message: 'no id.' })
      return
    }

    let card = await Card.findOne({_id: req.body.id, owner: req.session.user._id})
    if (!card) {
      res.json({success: false, message: 'card not found.'})
      return
    }

    await card.deleteOne()
    res.json({ success: true })
  } catch (err) {
    console.log('err deleteCard', err)
    throw err
  }
}

module.exports = controller
