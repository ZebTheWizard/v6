var express = require('express');
var router = express.Router();
var passport = require('passport')

/* GET users listing. */
passport.use(require('../setup/twitter'))
passport.use(require('../setup/github'))

router.use(function (req, res, next) {
  res.locals.user = req.user
  next()
})
router.use('/', require('./twitter'));
router.use('/', require('./github'));

module.exports = router;
