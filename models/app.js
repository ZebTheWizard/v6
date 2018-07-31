const { Schema } = require('mongoose')

const Model = new Schema({
  "title": String,
  "description": String,
  "images": {
    "banner": String,
    "icon": String,
  },
  "downloads": [{ type: Schema.Types.ObjectId, ref: 'Download'}],
  "stats": {
    "downloads": Number,
    "likes": Number,
    "size": Number,
    "views": Number
  },
  "created_at": {
    type: Date,
    default: Date.now
  }
})

// Model.statics.findSigned = function() {
//   return this.find({})
// }

module.exports = Model
