var express = require('express');
var router = express.Router();
var passport = require('passport')

router.get('/login', function(req, res, next) {
  res.render('popups/login');
});


module.exports = router;
