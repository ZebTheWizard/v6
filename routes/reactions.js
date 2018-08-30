var express = require('express');
var router = express.Router();
var Model = require('../models')
var { App, Reaction, Comment, Article, Notification } = Model

router.post('/app', async function (req, res) {
  var app = await App.findById(req.body.id).exec()
  var [reaction, exists] = await Reaction.add({
    user: req.user,
    model: app,
    emoji: req.body.value
  })
  if (!exists && app.user !== req.user._id) {
    await Notification.send(app.user, {
      title: req.user.username + ' reacted to your app',
      invoker: req.user,
      link: '/app/' + app._id,
      body: `${app.name.substring(0,31)}${app.name.length > 30 ? '...' : ''} ${reaction.emoji}`,
    })
  }
  var reactions = await Reaction.getReactionsForModel(req, reaction.for, reaction.model)
  return res.json(reactions)
})

router.post('/comment', async function (req, res) {
  var comment = await Comment.findById(req.body.id).exec()
  var [reaction, exists] = await Reaction.add({
    user: req.user,
    model: comment,
    emoji: req.body.value
  })
  if (!exists && comment.user !== req.user._id) {
    await Notification.send(comment.user, {
      title: req.user.username + ' reacted to your comment ',
      invoker: req.user,
      link: `/${comment.for.toLowerCase()}/${comment.model}`,
      body: `${comment.content.substring(0,31)}${comment.content.length > 30 ? '...' : ''} ${reaction.emoji}`,
    })
  }
  var reactions = await Reaction.getReactionsForModel(req, reaction.for, reaction.model)
  return res.json(reactions)
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
