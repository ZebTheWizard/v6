const { Strategy } = require('passport-twitter')
var config = require('config');
const { User } = require('../../models')

module.exports = new Strategy({
  consumerKey: config.get('twitter.key'),
  consumerSecret: config.get('twitter.secret'),
  callbackURL: config.get("twitter.callback")
}, function (token, secret, profile, done) {
  User.findOne({ twitterID: profile.id }, (err, user) => {
    if (user) return done(null, user)

    var user = new User;
    user.twitterID = profile.id
    user.username = profile.username
    user.displayName = profile.displayName
    user.avatar = profile._json.profile_image_url_https
    user.save(err => {
      done(err, user)
    })
  })
})
