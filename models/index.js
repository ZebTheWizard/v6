var mongoose = require('mongoose')

module.exports = {
  User: mongoose.model('User', require('./user')),
  App: mongoose.model('App', require('./app')),
  Ipa: mongoose.model('Ipa', require('./ipa')),
  Reaction: mongoose.model('Reaction', require('./reaction')),
}
