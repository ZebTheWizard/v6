const { Strategy } = require('passport-local')
var config = require('config');
const { User } = require('../../models')
const argon2 = require('argon2')

module.exports = new Strategy({
  usernameField: 'username',
  passwordField: 'password',
  session: true,
  passReqToCallback: true
}, function (req, username, password, done) {
  User.findOne({ username: username }, (err, user) => {
    if (user && typeof req.user === 'undefined') {
      done((new Error('User already exists')))
    }
    if (user) {
      argon2.verify(user.password, password).then(match => {
        if (match) return done(null, user)
        else return done((new Error('Invalid Login')))
      }).catch(err => {
        return done(err)
      })
    } else if (!req.cookies.isGuest || req.cookies.isGuest === 'false') {
      if (req.body['password'] !== req.body['confirm-password']) {
        done((new Error('Passwords do not match')))
      }
      argon2.hash(password).then(hash => {
        var user = (typeof req.user === 'undefined') ? new User : req.user;
        user.username = username;
        user.password = hash;
        user.avatar = `https://api.adorable.io/avatars/100/${username}.png`,
        user.incompleteSignup = false;
        user.save(err => {
          done(err, user)
        })
      })
    } else {
      done(null, {username, password}, 'nouser')
    }
  })
})
