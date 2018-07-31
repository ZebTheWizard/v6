const { Schema } = require('mongoose')

const Model = new Schema({
  "version": {
    "type": String,
    // "required": true,
  },
  "url": String,
  "type": {
    "type": String,
    // "required": true,
  },
  "name": {
    "type": String,
    // "required": true,
  },
  "created_at": {
    type: Date,
    default: Date.now
  }
}, { "strict": false} )

Model.index({
  "version": 1,
  "name": 1,
  "type": 1,
}, { "unique": true })

module.exports = Model
