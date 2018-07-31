var express = require('express');
var router = express.Router();
var auth = require('../auth/middleware');
var { Download } = require('../models')

router.use(auth)

router.get('/', async function(req, res) {
  var downloads = await Download.find().sort({ 'created_at': -1 }).limit(5).exec()
  res.render('pages/dashboard', {
    title: 'Dashboard',
    downloads
  });
});

module.exports = router
