var express = require('express');
var router = express.Router();

/* GET users listing. */
router.use(function (req, res, next) {
  res.locals.user = req.user
  next()
})
router.use('/', require('./twitter'));

module.exports = router;
