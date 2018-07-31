var express = require('express');
var router = express.Router();
var auth = require('../auth/middleware');

router.use(auth)

router.post('/new', function(req, res) {
  res.render('pages/app-edit', {title: 'Edit App'});
});

module.exports = router
