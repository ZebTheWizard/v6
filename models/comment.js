const mongoose = require('mongoose')
const { Schema } = mongoose
const { traits, types } = require('../lib/mongoose')

const Model = new Schema({
  "content": String,
  "for": String,
  "model": String,
  "mentions": [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  "user": {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  "created_at": types.date()
})

traits.hasReactions(Model, 'Comment')
traits.hasComments(Model, mongoose)
// traits.hasDates(Model, mongoose)

Model.statics.add = function (obj) { // {user, model, emoji}
  return new Promise(async (resolve, reject) => {
    var comment = new this
    comment.user = obj.user.id
    comment.for = obj.model.constructor.modelName
    comment.model = obj.model.id
    comment.content = obj.content
    await comment.save()
    resolve(comment)
  });
}


module.exports = Model
