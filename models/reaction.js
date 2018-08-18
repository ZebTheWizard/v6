const mongoose = require('mongoose')
const { Schema } = mongoose
const traits = require('../lib/mongoose-traits')

const Model = new Schema({
  "user": {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  "for": String,
  "model": String,
  "emoji": String,
  "created_at": traits.date()
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
    if (reaction) {
      reaction = await Object.assign(reaction, data).save()
    } else {
      reaction = new this
      reaction = await Object.assign(reaction, data).save()
    }
    resolve(reaction)
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
