var express = require('express');
var router = express.Router();
var Model = require('../models')
var { App, Article } = Model

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/landing', {title: ''});
});

router.get('/today', async function(req, res, next) {
  var articles = await Article.find({ published: { $exists: true}}).populate('reactions').exec()
  return res.render('pages/today', {
    title: 'Today',
    articles
  });
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


module.exports = router;
