const { Schema } = require('mongoose')

module.exports = new Schema({
  "username": {
    type: String,
    required: true
  },
  "displayName": {
    type: String,
    required: true
  },
  "password": {
    type: String,
  },
  "avatar": {
    type: String,
    required: true
  },
  "twitterID": {
    type: 'string',
  },
  "created_at": {
    type: Date,
    default: Date.now
  }
})
