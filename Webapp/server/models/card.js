const mongoose = require('mongoose')
const Schema = mongoose.Schema

let schema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'categories',
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('cards', schema)
