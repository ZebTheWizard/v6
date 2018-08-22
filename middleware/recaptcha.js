var express = require('express');
var router = express.Router();
var axios = require('axios')
var config = require('../config')


router.use(function(req, res, next) {
  var queryString = params => Object.keys(params).map(key => key + '=' + params[key]).join('&')
  var data = {
    secret: config.get('recaptcha.secret'),
    response: req.body['g-recaptcha-response'],
    remoteip: req.headers['x-real-ip'] || req.connection.remoteAddress,
  }
  axios.post('https://www.google.com/recaptcha/api/siteverify?' + queryString(data), )
  .then(result => {
    if (result.data.success) next()
    // TODO: add validation
    else res.redirect('back')
  })
});

module.exports = router;
