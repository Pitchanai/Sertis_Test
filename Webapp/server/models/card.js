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
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: Schema.Types.ObjectId,
    ref: 'status',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('cards', schema)
