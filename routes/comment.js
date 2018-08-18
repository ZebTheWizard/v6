var express = require('express');
var router = express.Router();
var Model = require('../models')
var { App, Comment } = Model


router.post('/app', async function (req, res) {
  var app = await App.findById(req.body.id).exec()
  var comment = await Comment.add({
    user: req.user,
    model: app,
    content: req.body.value
  })
  return res.redirect('back')
})




module.exports = router;
