var express = require('express');
var router = express.Router();

/* GET users listing. */
router.use(function(req, res, next) {
  if (typeof req.user === 'undefined') return res.redirect('/login')
  next()
});

module.exports = router;
