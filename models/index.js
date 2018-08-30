var mongoose = require('mongoose')

module.exports = {
  "Notification": mongoose.model('Notification', require('./notification')),
  "Reaction":     mongoose.model('Reaction', require('./reaction')),
  "Comment":      mongoose.model('Comment', require('./comment')),
  "Article":      mongoose.model('Article', require('./article')),
  "User":         mongoose.model('User', require('./user')),
  "App":          mongoose.model('App', require('./app')),
  "Ipa":          mongoose.model('Ipa', require('./ipa')),
}
