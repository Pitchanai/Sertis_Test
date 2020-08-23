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
    required: true
  },
})

module.exports = mongoose.model('categories', schema)
