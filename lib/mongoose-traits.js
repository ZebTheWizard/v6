const moment = require('moment')
const Time = require('./time')
const Size = require('./size')

module.exports = {
  hasReactions (Model, type) {
    Model.virtual('reactions', {
      ref: 'Reaction',
      localField: '_id',
      foreignField: 'model',
      justOne: false,
      options: {
        where: { for: type},
        select: 'user emoji'
      }
    })
  },
  hasComments (Model, mongoose) {
    Model.methods.getComments = function () {
      return mongoose.model('Comment').find({ for: this.constructor.modelName, model: this._id })
    }
  },
  date () {
    return {
      type: Date,
      default: Date.now,
      get: function ($date) {
        return new Time($date)
      }
    }
  },
  size () {
    return {
      type: Number,
      default: 0,
      get: function ($size) {
        return new Size($size)
      }
    }
  }
}
