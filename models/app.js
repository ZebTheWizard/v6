const mongoose = require('mongoose')
const { Schema } = mongoose
const { hasReactions } = require('../lib/mongoose-traits')

const Model = new Schema({
  "name": String,
  "features": String,
  "short": String,
  "signed": String,
  "ratings": [{
    type: Schema.Types.ObjectId,
    ref: 'Rating'
  }],
  "user": {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  "ipas": [{
    type: Schema.Types.ObjectId,
    ref: 'Ipa'
  }],
  "stats": {
    "downloads": Number,
    "likes": Number,
    "size": Number,
    "views": Number
  },
  "itunes": {
    "advisories": [String],
    "icon": String,
    "contentAdvisoryRating": String,
    "genres": [String],
    "description": String,
    "screenshots": [String],
    "languages": [String]
  },
  "created_at": {
    type: Date,
    default: Date.now
  }
})

hasReactions(Model, mongoose)


module.exports = Model
