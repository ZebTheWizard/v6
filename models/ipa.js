const { Schema } = require('mongoose')

const Model = new Schema({
  "displayName": String,
  "version": {
    type: String,
    default: 'n/a'
  },
  "size": Number,
  "bundleId": String,
  "ipaUrl": String,
  "iconUrl": String,
  "iconKey": String,
  "extension": String,
  "name": String,
  "minimumOS": String,
  "progress": {
    id: String,
    status: String,
    amount: Number
  },
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
