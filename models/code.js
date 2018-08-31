const mongoose = require('mongoose')
const { Schema } = mongoose
const { traits, types } = require('../lib/mongoose')

const Model = new Schema({
  "code": String,
  "expiresDaysAfterCreated": Number,
  "created_at": types.date()
}, { toJSON: { virtuals: true }})



module.exports = Model
