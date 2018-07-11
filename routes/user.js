var express = require('express');
var router = express.Router();
var auth = require('../auth/middleware');

/* GET users listing. */
router.get('/', auth ,function(req, res, next) {
  res.locals.user = req.user
  return res.render('profile', {title: 'Profile'})
});

module.exports = router;
