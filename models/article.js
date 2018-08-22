const mongoose = require('mongoose')
const { Schema } = mongoose
const traits = require('../lib/mongoose-traits')

const Model = new Schema({
  "title": String,
  "title2": String,
  "subtitle": String,
  "content": String,
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

  "created_at": traits.date()
}, { toJSON: { virtuals: true }})




traits.hasReactions(Model, 'Article')
traits.hasComments(Model, mongoose)
// traits.hasDates(Model, mongoose)


module.exports = Model
