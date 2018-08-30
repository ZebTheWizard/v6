var express = require('express');
var router = express.Router();
var auth = require('../auth/middleware');
var argon2 = require('argon2')
var { User, Notification } = require('../models')

router.use(auth)

router.get('/', function(req, res) {
  res.render('pages/profile', {title: 'Account'});
});

router.post('/json', async function(req, res) {
  var [user] = await User.find({_id: req.user.id}).select('-__v -incompleteSignup').exec()
  return res.json(user)
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

router.get('/notifications/:page?', async function (req, res) {
  // TODO: pagination
  var notifications = await Notification.find({ user: req.user }).sort({ 'created_at': -1 }).populate('invoker', 'avatar username').exec()
  if (req.params.page === 'count') {
    var unread = await Notification.count({ user: req.user, unread: true }).exec()
    return res.json(unread)
  } else {
    var page = req.params.page || 1
    res.on('finish', async () => {
      await Notification.update({ user: req.user, unread: true }, { unread: false }, {multi: true }).exec()
    })
    return res.render('pages/notifications', {
      notifications,
      title: 'Notifications'
    })
  }

})

module.exports = router;
