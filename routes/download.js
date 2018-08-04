var express = require('express');
var router = express.Router();
var auth = require('../auth/middleware');
var { Ipa } = require('../models')
var multer = require('multer')()
require('isomorphic-fetch');
var Dropbox = require('../config/dropbox')
var s3 = require('../config/s3')
var uuid = require('uuid/v4')
// var mime = require('mime')
// var fs = require('mz/fs')
var config = require('../config')
var extract = require('../extract')


router.use(auth)

router.post('/new', function(req, res) {
  var download = new Ipa()
  download.save()
  return res.render('pages/download-edit', {
    title: 'Edit Download',
    download,
  });
});

router.get('/get/:id', async function (req, res) {
  var download = await Ipa.findById(req.params.id).exec()
  var file = await Dropbox.filesDownload({
    path: download.ipaUrl
  })
  res.setHeader('Content-Disposition', 'attachment; filename=' + download.name + '.' + download.extension)
  return res.type('application/octet-stream').send(file.fileBinary)
})

router.post('/update', multer.single('upload'), async function(req, res) {
  if (req.file) {
    var ext = req.file.originalname.split('.').reverse()[0]
    if (ext !== 'ipa') return res.status(501).send('invalid file type')


    try {
      var { iconBinary, iconExtension, plist, ipapath } = await extract(req.file.buffer)
    } catch (e) {
      return res.json(e)
    }

    var ipa = await Dropbox.filesUpload({
      path: '/ipas/' + uuid() + '.' + ext,
      contents: req.file.buffer
    })

    var icon = await s3.putObject({
      Bucket: config.get('s3.bucket'),
      Key: '/icons/' + uuid() + '.' + iconExtension,
      Body: iconBinary,
      ACL: 'public-read',
      ContentType: 'image/' + iconExtension,
    })
    // return res.json('done')
    var download = await Ipa.findByIdAndUpdate(req.body.id, {
      $set: {
        version: req.body.version,
        ipaUrl: ipa.path_display,
        iconUrl: icon.url,
        extension: ext,
        name: req.body.name,
        size: ipa.size,
      }
    }, {new: true}).exec()
  } else {
    var download = await Ipa.findByIdAndUpdate(req.body.id, {
      $set: {
        version: req.body.version,
        name: req.body.name,
      }
    }, {new: true}).exec()
  }

  return res.redirect(`/download/edit/${ download.id }`);
})

router.get('/json', async function(req, res) {
  var downloads = await Ipa.find().exec()
  res.json(downloads)
});

router.get('/edit/:id', async function(req, res) {
  var download = await Ipa.findById(req.params.id).exec()
  res.render('pages/download-edit', {
    title: 'Edit Ipa',
    download
  });
});



module.exports = router
