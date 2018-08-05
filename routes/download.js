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
var fs = require('mz/fs')
var config = require('../config')
var extract = require('../extract')
var io = require('socket.io')()
io.attach(8000)
// var www = require('../bin/www')


router.use(auth)

io.on('connect', socket => {
  socket.on('subscribe', room => {
    socket.join(room)
  })

  socket.on('unsubscribe', room => {
    socket.leave(room)
  })

  socket.on('send', data => {
    io.sockets.in(data.room).emit('message', data)
  })
})

function bufferToStream(buffer, size) {
  var items = []
  var offset = 0;
  for (var i = size; offset < buffer.length - 1; i+=size) {
    items.push(buffer.slice(offset, i))
    offset += size
  }
  return {
    buffer,
    chunks: items
  }
}

function setProgress(options) {
  return new Promise(async function(resolve, reject) {
    if (options.status === 'done') var query = { $unset: { progress: 1 }}
    else var query = { $set: { progress: options }}
    var ipa = await Ipa.findByIdAndUpdate(options.id, query, {new: true}).exec()
    io.sockets.in(`/download/edit/${options.id}`).emit('ipa-progress-message', options)
    resolve(ipa)
  });
}


router.get('/stream/:chunks', function (req, res) {
  res.render('pages/today', {title: 'Today'});
  setTimeout(() => {
    io.sockets.in('download').emit('message', { count: 1, progress: 20})
  }, 3000)
})

router.post('/new', function(req, res) {
  var download = new Ipa()
  download.name = uuid()
  download.save()
  return res.redirect(`/download/edit/${ download.id }`);
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
  await setProgress({ status: 'processing', amount: 100, id: req.body.id })

  var download = await Ipa.findByIdAndUpdate(req.body.id, {
    $set: {
      name: req.body.name,
    }
  }, {new: true}).exec()

  res.redirect(`/download/edit/${ req.body.id }`);
  if (req.file) {
    var ext = req.file.originalname.split('.').reverse()[0]
    if (ext !== 'ipa') {
      await setProgress({ status: 'done', amount: 100, id: req.body.id })
      console.log('invalid file type');
      return
    }

    try {
      var { iconBinary, iconExtension, plist, ipapath } = await extract(req.file.buffer)
    } catch (e) {
      return res.json(e)
    }

    var ipa = await Dropbox.uploadSession({
      stream: bufferToStream(req.file.buffer, 1 * 1000 * 1000), // 8mb chunks
      path: `/${uuid()}.txt`,
    }, function (data) {
      setProgress({ status: 'uploading ipa', amount: data.progress, id: req.body.id })
    })

    var icon = await s3.putObject({
      Bucket: config.get('s3.bucket'),
      Key: 'icons/' + uuid() + '.' + iconExtension,
      Body: iconBinary,
      ACL: 'public-read',
      ContentType: 'image/' + iconExtension,
    }, function (data) {
      setProgress({ status: 'uploading images', amount: data.loaded / data.total * 100, id: req.body.id })
    })

    try {
      await setProgress({ status: 'finalizing', amount: 100, id: req.body.id })
      var download = await Ipa.findByIdAndUpdate(req.body.id, {
        $set: {
          displayName: plist.CFBundleDisplayName,
          version: plist.CFBundleShortVersionString || plist.CFBundleVersion || 'n/a',
          ipaUrl: ipa.path_display || 'n/a',
          iconUrl: icon.url,
          iconKey: icon.key,
          extension: ext,
          size: ipa.size || 0,
          minimumOS: plist.MinimumOSVersion,
        }
      }, {new: true}).exec()
      await setProgress({ status: 'done', amount: 100, id: req.body.id })
    } catch (e) {}

  } else {
    await setProgress({ status: 'done', amount: 100, id: req.body.id })
  }

})

router.get('/json', async function(req, res) {
  var downloads = await Ipa.find().exec()
  res.json(downloads)
});

router.get('/edit/:id', async function(req, res) {
  var download = await Ipa.findById(req.params.id).exec()
  res.render('pages/download-edit', {
    title: 'Edit IPA',
    download
  });
});

router.post('/delete', async function(req, res) {
  var ipa = await Ipa.findByIdAndRemove(req.body.id).exec()
  if (ipa.ipaUrl) await Dropbox.filesDelete({path: ipa.ipaUrl})

  if (ipa.iconKey) {
    await s3.deleteObject({
      Bucket: config.get('s3.bucket'),
      Key: ipa.iconKey
    })
  }

  res.redirect('/dashboard');
});



module.exports = router
