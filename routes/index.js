var express = require('express');
var router = express.Router();
var passport = require('passport')
var Model = require('../models')
var { App, Ipa, Reaction, User } = Model
var dsession = require('../lib/download-uuid')

/* GET home page. */
router.get(['/', '/today'], function(req, res, next) {
  res.render('pages/today', {title: 'Today'});
});

router.get('/games', function(req, res, next) {
  res.render('pages/games', {title: 'Games'});
});

router.get('/apps', async function(req, res, next) {
  var apps = await App.find().populate({ path: 'ipas', options: {sort: {'version': -1}}}).limit(20).exec()
  return res.render('pages/apps', {
    title: 'Apps',
    apps,
    dsession: dsession.regen(req)
  });
});




router.get('/updates', function(req, res, next) {
  res.render('pages/updates', {title: 'Updates'});
});

router.get('/search', function(req, res, next) {
  res.render('pages/search', {title: 'Search'});
});

router.post('/react/app', async function (req, res) {
  var app = await App.findById(req.body.id).exec()
  var reaction = await Reaction.add({
    user: req.user,
    model: app,
    emoji: req.body.value
  })
  return res.redirect('back')
})

router.get('/test/reaction', async function (req, res) {
  var app = await App.findById('5b70282fc44eb6bfbe98561c').exec()
  console.log(app.id);
  var allreactions = await Reaction.find().exec()
  var reactions = await app.getReactionCount()

  return res.json(reactions)
})

// router.get('/about', function(req, res, next) {
//   res.render('about', {title: 'About'});
// });
//

//
// router.get('/login', function(req, res, next) {
//   if (typeof req.user !== 'undefined') res.redirect('/profile')
//   res.render('login')
// });

// router.get('/auth/twitter', passport.authenticate('twitter'));
// router.get('/auth/twitter/callback',
//   passport.authenticate('twitter', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });

module.exports = router;
