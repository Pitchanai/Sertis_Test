const mongoose = require('mongoose')
const Schema = mongoose.Schema

let schema = new Schema({
  name: {
    type: String,
    unique: false,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  joinedMember: {
    type: [Schema.Types.ObjectId],
    required: false
  },
  maxMember: {
    type: Number,
    default: 10,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true
  },
  createdAt: {
    type: Schema.Types.Date,
    required: true
  }
})

module.exports = mongoose.model('party', schema)
