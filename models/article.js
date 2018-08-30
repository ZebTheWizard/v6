const mongoose = require('mongoose')
const { Schema } = mongoose
const { traits, types } = require('../lib/mongoose')

const Model = new Schema({
  "title": String,
  "title2": String,
  "subtitle": String,
  "content": String,
  "published": Object,
  "published_at": types.date(false),
  "image": {
    "thumbnail": String,
    "original": String,
  },
  "colors": {
    "title": {
      type: String,
      default: 'ffffff'
    },
    "title2": {
      type: String,
      default: 'ffffff'
    },
    "subtitle": {
      type: String,
      default: 'ffffff'
    }
  },
  "user": {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  "created_at": types.date()
}, { toJSON: { virtuals: true }})


traits.isPublishable(Model)
traits.hasReactions(Model, 'Article')
traits.hasComments(Model, 'Article')
// traits.hasDates(Model, mongoose)


module.exports = Model
