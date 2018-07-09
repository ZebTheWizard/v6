var express = require('express');
var router = express.Router();
var passport = require('passport')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.get('/login', function(req, res, next) {
  if (typeof req.user !== 'undefined') res.redirect('/profile')
  res.render('login')
});

// router.get('/auth/twitter', passport.authenticate('twitter'));
// router.get('/auth/twitter/callback',
//   passport.authenticate('twitter', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });

module.exports = router;
