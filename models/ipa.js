const mongoose = require('mongoose')
const { Schema } = mongoose
const { traits, types } = require('../lib/mongoose')

const Model = new Schema({
  "displayName": String,
  "version": {
    type: String,
    default: 'n/a'
  },
  "size": types.size(),
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
  "created_at": types.date()
}, { "strict": false} )

Model.index({
  "version": 1,
  "name": 1,
}, { "unique": true })

module.exports = Model
