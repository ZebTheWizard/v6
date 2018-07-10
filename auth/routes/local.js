var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/auth/local', function (req, res) {
  res.render('signup')
});

router.post('/auth/local', function (req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (info === 'nouser') {
      res.cookie('isGuest', false)
      return res.render('signup', {
        finishingSignup: true,
        nouser: true,
        username: user.username,
        password: user.password
      })
    }
    if (err) return next(err)
    req.logIn(user, err => {
      if (err) return next(err)
      return res.redirect('/')
    })
  })(req, res, next)
})

module.exports = router;
