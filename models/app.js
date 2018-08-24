const mongoose = require('mongoose')
const { Schema } = mongoose
const { traits, types } = require('../lib/mongoose')

const Model = new Schema({
  "name": String,
  "features": String,
  "short": String,
  "signed": String,
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
  "created_at": types.date()
}, { toJSON: { virtuals: true }})


traits.hasReactions(Model, 'App')
traits.hasComments(Model, mongoose)


module.exports = Model
