const { Strategy } = require('passport-twitter')
var config = require('config');
const { User } = require('../../models')

module.exports = new Strategy({
  consumerKey: config.get('twitter.key'),
  consumerSecret: config.get('twitter.secret'),
  callbackURL: 'http://127.0.0.1:3000/login/twitter/return'
}, async function (token, secret, profile, done) {
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


  // console.log(user);
  return cb(null, profile)
})
