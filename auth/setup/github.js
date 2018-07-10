const { Strategy } = require('passport-github')
var config = require('config');
const { User } = require('../../models')

module.exports = new Strategy({
  clientID: config.get('github.key'),
  clientSecret: config.get('github.secret'),
  callbackURL: config.get("github.callback")
}, function (token, secret, profile, done) {
  User.findOne({ githubID: profile.id }, (err, user) => {
    if (user) return done(null, user)

    var user = new User;
    user.githubID = profile.id
    user.username = profile.username
    user.displayName = profile.displayName
    user.avatar = profile._json.avatar_url
    user.save(err => {
      done(err, user)
    })
  })
})
