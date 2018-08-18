const mongoose = require('mongoose')
const { Schema } = mongoose
const traits = require('../lib/mongoose-traits')

const Model = new Schema({
  "displayName": String,
  "version": {
    type: String,
    default: 'n/a'
  },
  "size": traits.size(),
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
  "created_at": traits.date()
}, { "strict": false} )

Model.index({
  "version": 1,
  "name": 1,
}, { "unique": true })

module.exports = Model
