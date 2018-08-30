const mongoose = require('mongoose')
const { Schema } = mongoose
const { traits, types } = require('../lib/mongoose')
var Socket = require('../lib/sockets')
var socket = new Socket

const Model = new Schema({
  "user": {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  "title": String,
  "link": String,
  "body": String,
  "unread": {
    type: Boolean,
    default: true
  },
  "invoker": {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  "created_at": types.date()
})

Model.statics.validate = function (emoji) {
  var exceptedRatings = ['😍', '🙂', '😕', '😡']
  if (!exceptedRatings.includes(emoji)) {
    emoji = '😍'
  }
  return emoji
}

Model.statics.send = function (id, data) { // {user, model, emoji}
  return new Promise(async (resolve, reject) => {
    var n = new this
    n.title = data.title
    n.link = data.link
    n.body = data.body
    n.user = id
    n.invoker = data.invoker
    await n.save()
    socket.room('/notification/' + id).message(data).of('notification').send()
    resolve(n)
  });
}


module.exports = Model
