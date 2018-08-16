const mongoose = require('mongoose')
const { Schema } = mongoose

const Model = new Schema({
  "username": String,
  "password": String,
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
  "created_at": {
    type: Date,
    default: Date.now
  }
})

Model.methods.reactions = function () {
  return mongoose.model('Reaction').find({ user: this._id })
}

module.exports = Model
