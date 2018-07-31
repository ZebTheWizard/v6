var mongoose = require('mongoose')

module.exports = {
  User: mongoose.model('User', require('./user')),
  App: mongoose.model('App', require('./app')),
  Download: mongoose.model('Download', require('./download')),
}
