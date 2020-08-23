const config = require('../config/serverConfig')
const Party = require('../models/party')

const controller = {}

const ObjectId = require('mongoose').Types.ObjectId

/**
 * for test
 */
controller.test = async (req, res, next) => {
  try {
    console.log('req.sessions', req.session)
    res.json({ success: true })
  } catch (err) {
    throw err
  }
}

/**
 * @param name party name
 * @param description party description
 * @param maxMember max member that can join party
 */
controller.create = async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.description || !req.body.maxMember) {
      res.json({ success: false, message: 'Please fill name and description.' })
      return
    }

    if (isNaN(req.body.maxMember) || req.body.maxMember <= 0) {
      res.json({success: false, message: 'maxMember must be > 0'})
      return
    }

    let newParty = new Party({
      name: req.body.name,
      description: req.body.description,
      maxMember: req.body.maxMember,
      owner: req.session.user._id,
      createdAt: new Date()
    })

    await newParty.save()
    res.json({success: true, body: { name: req.body.name }})
    return
  } catch (err) {
    console.log('signup error', err)
    throw err
  }
}

controller.getAll = async (req, res, next) => {
  try {
    let allParty = await Party.find({})

    let response = allParty.map(party => {
      console.log(party.joinedMember)
      return {
        id: party._id.toString(),
        name: party.name,
        description: party.description,
        joinedMember: party.joinedMember.length,
        maxMember: party.maxMember,
        isOwner: party.owner.toString() == req.session.user._id,
        isJoined: party.joinedMember.includes(new ObjectId(req.session.user._id))
      }
    })

    res.json({ success: true, body: response })

  } catch (err) {
    console.log('getAll err', err)
    throw err
  }
}

/**
 * @param id party id
 */
controller.join = async (req, res, next) => {
  try {
    let idObject = new ObjectId(req.body.id)
    let userObject = req.session.user._id
    let existedParty = await Party.findOne({
      _id: idObject,
    })

    if (existedParty.joinedMember.includes(userObject)) {
      res.json({ success: false, message: 'Already joined.' })
      return
    }

    if (existedParty.owner == userObject) {
      res.json({ success: false, message: `You're the owner.` })
      return
    }

    if (existedParty.joinedMember.length >= existedParty.maxMember) {
      res.json({ success: false, message: `Party full.`})
      return
    }

    existedParty.joinedMember.push(userObject)
    let _ = await existedParty.save()

    res.json({success: true})
  } catch (err) {
    console.log('join err', err)
    throw err
  }
}

/**
 * @param id party id
 */
controller.leave = async (req, res, next) => {
  try {
    let idObject = new ObjectId(req.body.id)
    let userObject = req.session.user._id
    let existedParty = await Party.findOne({
      _id: idObject,
    })

    if (!existedParty.joinedMember.includes(userObject)) {
      res.json({success: false, message: `You're not a member of this party.`})
      return
    }

    if (existedParty.owner == userObject) {
      res.json({success: false, mesage: `You're the owner.`})
      return
    }
    
    existedParty.joinedMember = existedParty.joinedMember.filter(object => object != userObject)
    let _ = await existedParty.save()

    res.json({success: true})
  } catch (err) {
    console.log('join err', err)
    throw err
  }
}


module.exports = controller
