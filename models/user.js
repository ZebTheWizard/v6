const mongoose = require('mongoose')
const { Schema } = mongoose
const { traits, types } = require('../lib/mongoose')

const Model = new Schema({
  "username": String,
  "password": {
    type: String,
    select: false,
  },
  "avatar": String,
  "ratings": [{
    type: Schema.Types.ObjectId,
    ref: 'Rating'
  }],
  "incompleteSignup": {
    type: Boolean,
    default: true
  },
  "twitter": {
    "id": String,
    "avatar": String,
    "username": String,
    "displayName": String,
  },
  "github": {
    "id": String,
    "avatar": String,
    "username": String,
    "displayName": String,
  },
  "created_at": types.date()
})

Model.methods.getReactions = function () {
  return mongoose.model('Reaction').find({ user: this._id })
}

module.exports = Model
