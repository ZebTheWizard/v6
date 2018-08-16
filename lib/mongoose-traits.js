function hasReactions (Model, mongoose) {
  Model.methods.reactions = function () {
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
}

module.exports = {
  hasReactions
}
