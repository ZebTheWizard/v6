const { Schema } = require('mongoose')

module.exports = new Schema({
  "username": String,
  "password": String,
  "avatar": String,
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
