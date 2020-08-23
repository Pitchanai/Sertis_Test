const mongoose = require('mongoose')
const Schema = mongoose.Schema

let schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    unique: true,
    required: true,
  },
  color: {
    type: String,
    unique: false,
    required: true
  }
})

module.exports = mongoose.model('status', schema)
