var express = require('express');
var router = express.Router();

/* GET users listing. */
router.use(function(req, res, next) {
  if (!req.isAuthenticated()) return res.redirect('/login')
  next()
});

module.exports = router;
