var express = require('express');
var router = express.Router();
var passport = require('passport')

/* GET home page. */
router.get('/today', function(req, res, next) {
  res.render('pages/today', {title: 'Today'});
});

router.get('/games', function(req, res, next) {
  res.render('pages/games', {title: 'Games'});
});

router.get('/apps', function(req, res, next) {
  res.render('pages/apps', {title: 'Apps'});
});

router.get('/updates', function(req, res, next) {
  res.render('pages/updates', {title: 'Updates'});
});

router.get('/search', function(req, res, next) {
  res.render('pages/search', {title: 'Search'});
});

router.get('/login', function(req, res, next) {
  res.render('pages/login');
});


module.exports = router;
