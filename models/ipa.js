const { Schema } = require('mongoose')

const Model = new Schema({
  "displayName": String,
  "version": String,
  "size": Number,
  "ipaUrl": String,
  "iconUrl": String,
  "iconKey": String,
  "extension": String,
  "name": String,
  "minimumOS": String,
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
