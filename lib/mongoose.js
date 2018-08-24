const moment = require('moment')
const Time = require('./time')
const Size = require('./size')

const traits = {
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
  isPublishable(Model) {
    Model.methods.publish = async function() {
      var doc = Object.assign({}, this._doc)
      delete doc.published
      this.published = doc
      this.published_at = Date.now()
      this.save()
    }
  }
}

const types = {
  date (setByDefault=true) {
    return {
      type: Date,
      default: setByDefault ? Date.now : null,
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

module.exports = { traits, types }
