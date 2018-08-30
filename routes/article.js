var express = require('express');
var router = express.Router();
var auth = require('../auth/middleware');
var recaptcha = require('../middleware/recaptcha');
var { Article } = require('../models')
var multer = require('multer')()
var uuid = require('uuid/v4')
var s3 = require('../config/s3')
var config = require('../config')
var sharp = require('sharp')


router.post('/new', auth, function(req, res) {
  var article = new Article()
  article.title = uuid()
  article.user = req.user
  article.save()
  return res.redirect(`/article/edit/${ article.id }`);
});

router.get('/edit/:id', auth, async function(req, res) {
  var article = await Article.findById(req.params.id).exec()
  return res.render('pages/article-edit', {
    title: 'Edit Article',
    article
  });
});

router.post('/publish', recaptcha, auth, async function(req, res) {
  var article = await Article.findById(req.body.id).exec()
  article.publish()
  return res.redirect('back')
});

router.post('/update', multer.single('upload'), recaptcha, auth, async function(req, res) {
  // TODO: needs validation
  if (!req.file) return res.json('needs file')
  var ext = req.file.originalname.split('.').reverse()[0]
  var thumbnail = await sharp(req.file.buffer).resize(400, 380).crop('center').toBuffer()
  var image = await s3.putObject({
    Bucket: config.get('s3.bucket'),
    Key: 'today/' + uuid() + '.' + ext,
    Body: thumbnail,
    ACL: 'public-read',
    ContentType: req.file.mimetype,
  }, function (data) {
    // TODO: needs progress
    console.log({amount: data.loaded / data.total * 100});
    // setProgress({ status: 'distributing images', amount: data.loaded / data.total * 100, id: req.body.id })
  })

  await Article.findByIdAndUpdate(req.body.id, {
    $set: {
      title: req.body.title,
      title2: req.body.title2,
      subtitle: req.body.subtitle,
      content: req.body.content,
      image: {
        thumbnail: image.url
      },
      colors: {
        title: req.body['title-color'],
        title2: req.body['title2-color'],
        subtitle: req.body['subtitle-color'],
      }
    }
  }, {new: true}).exec()
  return res.redirect(`/article/edit/${req.body.id}`)
})

router.get('/json', async function(req, res) {
  var articles = await Article.find().exec()
  res.json(articles)
})

router.get('/:id', auth, async function(req, res) {
  var article = await Article.findById(req.params.id)
    .populate('reactions')
    .populate({ path: 'comments', populate: ['user', 'reactions'] })
    .exec()
  return res.render('pages/article-view', {
    article
  });
});



module.exports = router
