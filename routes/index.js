var express = require('express');
var router = express.Router();
var passport = require('passport')
var Model = require('../models')
var { App, Ipa, Reaction, User } = Model
var dsession = require('../lib/download-uuid')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/landing', {title: ''});
});

router.get('/today', function(req, res, next) {
  res.render('pages/today', {title: 'Today'});
});

router.get('/games', function(req, res, next) {
  res.render('pages/games', {title: 'Games'});
});

router.get('/apps', async function(req, res, next) {
  var apps = await App.find({ ipas: { $gt: [] } }).populate({ path: 'ipas', options: {sort: {'version': -1}}}).limit(20).exec()
  return res.render('pages/apps', {
    title: 'Apps',
    apps
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




module.exports = router;
