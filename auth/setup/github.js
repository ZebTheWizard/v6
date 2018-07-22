const { Strategy } = require('passport-github')
var config = require('config');
const { User } = require('../../models')

module.exports = new Strategy({
  clientID: config.get('github.key'),
  clientSecret: config.get('github.secret'),
  callbackURL: config.get("github.callback")
}, function (token, secret, profile, done) {
  User.findOne({ 'github.id': profile.id }, (err, user) => {
    if (user) return done(null, user)

    var user = new User;
    user.github = {
      id: profile.id,
      avatar: profile._json.avatar_url,
      username: profile.username,
      displayName: profile.displayName
    }
    user.incompleteSignup = true
    user.save(err => {
      done(err, user)
    })
  })
})
