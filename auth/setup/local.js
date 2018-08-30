const { Strategy } = require('passport-local')
var config = require('config');
const { User } = require('../../models')
const argon2 = require('argon2')

module.exports = new Strategy({
  usernameField: 'username',
  passwordField: 'password',
  session: true,
  passReqToCallback: true
}, async function (req, username, password, done) {
  if (req.user) { // signed up with 3rd party
    if (req.body['password'] !== req.body['confirm-password']) {
      done((new Error('Passwords do not match')))
    }
    console.log(typeof req.user.password);
    var user = await User.findOne({ username }).select('+password').exec()

    if (user && typeof req.user.password !== 'undefined') { // user exists after 3rd party
      console.log('user exists after 3rd party');

      var match = await argon2.verify(user.password, password)
      if (!match) return done((new Error('Invalid Login')))
      let o = req.user.toObject()
      delete o._id
      delete o.__v
      o.incompleteSignup = false
      await user.update(o).exec()
      await User.findOneAndRemove(req.user.toObject()).exec()
      done(null, user)
    } else { // after 3rd party username is unique
      console.log('user does not exist after 3rd party');
      var user = new User(req.user)
      var hash = await argon2.hash(password)
      user.username = username
      user.password = hash
      user.incompleteSignup = false
      user.avatar = `https://api.adorable.io/avatars/100/${username}.png`
      user.save(err => {
        done(err, req.user)
      })
    }
  } else { // signing up local
    var user = await User.findOne({ username }).exec()
    if (user) { // if user exists
      console.log('local user exists');
      var match = await argon2.verify(user.password, password)
      if (match) return done(null, user)
      else return done((new Error('Invalid Login')))
    } else { // if user does not exist
      console.log('local user does not exist');
      var user = new User;
      user.username = username;
      user.save(err => {
        done(err, user)
      })
    }

  }
})
