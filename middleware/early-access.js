var express = require('express');
var router = express.Router();
var { Code } = require('../models')
var Time = require('../lib/time')

router.post('/early', async function (req, res, next) {
  var code = await Code.findOne({ code: req.body.code }).exec()
  if (!code) return res.status(301).json('permission denied')

  var created = code.created_at.date()
  var expires = (new Date()).setDate(created.getDate() + code.expiresDaysAfterCreated)
  if (new Date < expires) {
    req.session.earlyAccessGranted = true
    return res.status(200).json('ok')
  } else {
    return res.status(301).json('permission denied')
  }

})

router.use(function(req, res, next) {
  if (req.session.earlyAccessGranted) return next()
  return res.render('pages/early')
});

module.exports = router;
