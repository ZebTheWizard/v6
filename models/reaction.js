const mongoose = require('mongoose')
const { Schema } = mongoose
const { traits, types } = require('../lib/mongoose')

const Model = new Schema({
  "user": {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  "for": String,
  "model": String,
  "emoji": String,
  "created_at": types.date()
})

Model.statics.validate = function (emoji) {
  var exceptedRatings = ['😍', '🙂', '😕', '😡']
  if (!exceptedRatings.includes(emoji)) {
    emoji = '😍'
  }
  return emoji
}

Model.statics.add = function (obj) { // {user, model, emoji}
  return new Promise(async (resolve, reject) => {
    var query = {
      user: obj.user.id,
      for: obj.model.constructor.modelName,
      model: obj.model.id,
    }
    var data = Object.assign({
      emoji: this.validate(obj.emoji)
    }, query)

    var reaction = await this.findOne(query).exec()
    var alreadyExists = false
    if (reaction) {
      alreadyExists = true
      reaction = await Object.assign(reaction, data).save()
    } else {
      reaction = new this
      reaction = await Object.assign(reaction, data).save()
    }
    resolve([reaction, alreadyExists])
  });
}

Model.statics.getReactionsForModel = function(req, name, id) {
  return new Promise(async (resolve, reject) => {
    var reactions = await this.find({for: name, model: id}).exec()
    var $reactions = { '😍': {count:0, selected:''}, '🙂': {count:0, selected:''}, '😕': {count:0, selected:''}, '😡': {count:0, selected:''}}
    for (var i = 0; i < reactions.length; i++) {
      var reaction = reactions[i]
      $reactions[reaction.emoji].count ++
      if (req.user) {
        if (reaction.user.toString() === req.user.id) $reactions[reaction.emoji].selected = 'selected'
      }
    }
    resolve($reactions)
  });
}

// Model.statics.getCount = function (obj) {
//   return new Promise(async (resolve, reject) => {
//     var ratings = await this.find({ type: obj.type, model: obj.model}).exec()
//     var rc = {}
//     ratings.forEach(v => rc[v.value] = (rc[v.value] || 0) + 1)
//     resolve(rc)
//   });
// }

module.exports = Model
