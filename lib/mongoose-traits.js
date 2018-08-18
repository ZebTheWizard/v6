const moment = require('moment')
const Time = require('./time')
const Size = require('./size')

module.exports = {
  hasReactions (Model, mongoose) {
    Model.methods.getReactions = function () {
      return mongoose.model('Reaction').find({ for: this.constructor.modelName, model: this._id })
    }

    Model.methods.getReactionCount = function () {
      return new Promise(async (resolve, reject) => {
        var reactions = await mongoose.model('Reaction').aggregate([
            { $match: { for: this.constructor.modelName}},
            { $match: { model: this._id}},
            { $group: { _id: '$emoji', count: { $sum: 1}}},
        ]).exec()
        reactions = reactions.reduce((obj, v) => {
          obj[v._id] = v.count
          return obj
        }, {})
        resolve(reactions)
      });
    }
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
