const { Schema } = require('mongoose')

const Model = new Schema({
  "version": String,
  "size": Number,
  "ipaUrl": String,
  "iconUrl": String,
  "extension": String,
  "name": String,
  "created_at": {
    type: Date,
    default: Date.now
  }
}, { "strict": false} )

Model.index({
  "version": 1,
  "name": 1,
}, { "unique": true })

module.exports = Model
