var express = require('express');
var router = express.Router();
var passport = require('passport')

/* GET users listing. */
passport.use(require('../setup/twitter'))
passport.use(require('../setup/github'))
passport.use(require('../setup/local'))
passport.use('mongoose', require('../setup/mongoose'))

router.use(function (req, res, next) {
  res.locals.user = req.user
  res.locals.isGuest = !req.isAuthenticated()
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})

router.use(function (req, res, next) {
  if (typeof req.user === 'undefined') {
    res.cookie('isGuest', true)
    return next()
  }
  res.cookie('isGuest', false)
  if (req.user.incompleteSignup && req.url !== '/auth/local') {
    return res.render('popups/login', {finishingSignup: true})
  }
  next()
})

router.post('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.use('/', require('./twitter'));
router.use('/', require('./github'));
router.use('/', require('./local'));

module.exports = router;
