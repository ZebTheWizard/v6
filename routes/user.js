var express = require('express');
var router = express.Router();
var auth = require('../auth/middleware');
var argon2 = require('argon2')

router.use(auth)

router.get('/', function(req, res) {
  res.render('pages/profile', {title: 'Account'});
});

router.post('/update/username', function (req, res) {
  var user = req.user
  user.username = req.body.username
  user.save()
  res.redirect('back')
})

router.post('/update/password', async function (req, res) {
  var match = await argon2.verify(req.user.password, req.body['current-password'])
  if (match && req.body.password === req.body['confirm-password']) {
    var hash = await argon2.hash(req.body.password)
  } else {
    console.log('incorrect password');
    return res.redirect('back')
  }
  console.log(hash);
  var user = req.user
  user.password = hash
  user.save()
  res.redirect('back')
})

module.exports = router;
