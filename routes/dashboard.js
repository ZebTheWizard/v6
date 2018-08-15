var express = require('express');
var router = express.Router();
var auth = require('../auth/middleware');
var { Ipa, App } = require('../models')

router.use(auth)

router.get('/', async function(req, res) {
  var downloads = await Ipa.find().sort({ 'created_at': -1 }).limit(5).exec()
  var apps = await App.find().sort({ 'created_at': -1 }).limit(5).exec()
  res.render('pages/dashboard', {
    title: 'Dashboard',
    downloads,
    apps
  });
});

module.exports = router
