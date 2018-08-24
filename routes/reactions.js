var express = require('express');
var router = express.Router();
var Model = require('../models')
var { App, Reaction, Comment, Article } = Model


router.post('/app', async function (req, res) {
  var app = await App.findById(req.body.id).exec()
  await Reaction.add({
    user: req.user,
    model: app,
    emoji: req.body.value
  })
  return res.redirect('back')
})

router.post('/comment', async function (req, res) {
  var comment = await Comment.findById(req.body.id).exec()
  await Reaction.add({
    user: req.user,
    model: comment,
    emoji: req.body.value
  })
  return res.redirect('back')
})

router.post('/article', async function (req, res) {
  var article = await Article.findById(req.body.id).exec()
  await Reaction.add({
    user: req.user,
    model: article,
    emoji: req.body.value
  })
  return res.redirect('back')
})




module.exports = router;
