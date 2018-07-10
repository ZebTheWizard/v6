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
    if (user && typeof req.user !== 'undefined') {
      console.log('user already exists');
      done((new Error('User already exists')))
    }
    if (user) {
      console.log('found user');
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
        console.log(user);
        user.username = username;
        user.password = hash;
        user.avatar = `https://api.adorable.io/avatars/100/${username}.png`,
        user.incompleteSignup = false;
        user.save(err => {
          done(err, user)
        })
      })
    } else {
      // return res.render('signup', {finishingSignup: true})
      // console.log(req.cookies);
      // console.log('user does not exist');
      done(null, {username, password}, 'nouser')
    }
    // if (user) return done(null, user)
    //
    // var user = new User;
    // user.twitter = {
    //   id: profile.id,
    //   avatar: profile._json.profile_image_url_https,
    //   username: profile.username,
    //   displayName: profile.displayName
    // }
    // user.incompleteSignup = true
    // user.save(err => {
    //   done(err, user)
    // })
  })
})
