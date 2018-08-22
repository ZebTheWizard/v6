var express = require('express');
var router = express.Router();
var auth = require('../auth/middleware');
var recaptcha = require('../middleware/recaptcha');
var { Article, Rating } = require('../models')
var multer = require('multer')()
var Socket = require('../lib/sockets')
var uuid = require('uuid/v4')
var axios = require('axios');
var dsession = require('../lib/download-uuid')
var Dropbox = require('../config/dropbox')
var plist = require('simple-plist')
var s3 = require('../config/s3')
var config = require('../config')
// var axios = require('axios-jsonp-pro')

// router.use(auth)

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

router.post('/update', recaptcha, auth, async function(req, res) {
  var article = await Article.findByIdAndUpdate(req.body.id, {
    $set: {
      title: req.body.title,
      title2: req.body.title2,
      subtitle: req.body.subtitle,
      content: req.body.content,
      colors: {
        title: req.body['title-color'],
        title2: req.body['title2-color'],
        subtitle: req.body['subtitle-color'],
      }
    }
  }, {new: true}).exec()
  return res.redirect(`/article/edit/${req.body.id}`)
})

// router.post('/update', auth, async function(req, res) {
//   var [ipa] = await Ipa.find().where('_id').in(req.body.ipas).sort({ 'version': -1 }).limit(1).exec()
//   var { data } = await axios.get(`http://itunes.apple.com/lookup?bundleId=${ipa.bundleId}`)
//   if (req.body.signed) {
//     var protocol = 'itms-services://?action=download-manifest&url='
//     if (req.body.signed.startsWith(protocol)) {
//       var plistURL = req.body.signed.slice(protocol.length)
//       var plistRes = await axios.get(decodeURIComponent(plistURL))
//       var plistJson = plist.parse(plistRes.data)
//       var pd = plistJson.items[0]
//       pd.metadata.title = `${req.body.name} \nwith ❤️ from IOS Haven`
//       var plistFile = await s3.putObject({
//         Bucket: config.get('s3.bucket'),
//         Key: 'plist/' + uuid() + '.plist',
//         Body: plist.stringify(plistJson),
//         ACL: 'public-read',
//         ContentType: 'text/xml',
//       }, function (data) {
//         // console.log({ status: 'distributing plist', amount: data.loaded / data.total * 100, id: req.body.id })
//       })
//       var app = await App.findByIdAndUpdate(req.body.id, {
//         $set: {
//           signed: protocol + plistFile.url
//         }
//       }, {new: true}).exec()
//     } else {
//       return res.send('make sure the signed url starts with\n' + protocol)
//     }
//
//   }
//   // return res.json(req.body)
//   if (data.resultCount > 0) {
//     var itunes = data.results[0]
//     var app = await App.findByIdAndUpdate(req.body.id, {
//       $set: {
//         name: req.body.name,
//         ipas: req.body.ipas,
//         features: req.body.features,
//         short: req.body.short,
//         itunes: {
//           advisories: itunes.advisories,
//           icon: itunes.artworkUrl100,
//           contentAdvisoryRating: itunes.contentAdvisoryRating,
//           genres: itunes.genres,
//           description: itunes.description,
//           screenshots: itunes.screenshotUrls,
//           languages: itunes.languageCodesISO2A
//         }
//       }
//     }, {new: true}).exec()
//   } else {
//     var app = await App.findByIdAndUpdate(req.body.id, {
//       $set: {
//         name: req.body.name,
//         ipas: req.body.ipas,
//         features: req.body.features,
//         short: req.body.short,
//       }
//     }, {new: true}).exec()
//   }
//
//   return res.redirect(`/app/edit/${req.body.id}`)
// });
//
// router.get('/json', async function(req, res) {
//   var apps = await App.find().exec()
//   res.json(apps)
// })
//
// router.get('/ipa/:id', async function(req, res) {
//   if (dsession.check(req, req.query.d)) {
//     var ipa = await Ipa.findById(req.params.id).exec()
//     var file = await Dropbox.filesDownload({
//       path: ipa.ipaUrl
//     })
//     res.setHeader('Content-Disposition', `attachment; filename=${ipa.name} v${ipa.version}.${ipa.extension}`)
//     return res.type('application/octet-stream').send(file.fileBinary)
//   } else {
//     return res.json('404 not found')
//   }
// });
//
// router.get('/signed/:id', async function(req, res) {
//   var app = await App.findById(req.params.id).exec()
//   if (app.signed && dsession.check(req, req.query.d)) {
//     return res.redirect(app.signed)
//   } else {
//     return res.json('404 not found')
//   }
// });
//
// router.get('/:id', async function (req, res) {
//   var app = await App.findById(req.params.id).populate({ path: 'ipas', options: {sort: {'version': -1}}}).populate('reactions').exec()
//   // var reactions = await app.getReactionCount()
//   // var [ reactionFromUser ] = await req.user.getReactions().where({model: req.params.id}).limit(1).exec()
//   // var reactionFromUser = reactionFromUser || {}
//   app.comments = await app.getComments().populate('user').populate('reactions').exec()
//   // app.comments.forEach(async (comment) => {
//   //   comment.reactions = await comment.getReactions().exec()
//   // })
//   return res.render('pages/app-view', {
//     title: app.name,
//     app
//   });
// })



module.exports = router