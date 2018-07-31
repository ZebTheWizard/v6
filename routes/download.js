var express = require('express');
var router = express.Router();
var auth = require('../auth/middleware');
var { Download } = require('../models')

router.use(auth)

router.post('/new', function(req, res) {
  return res.json(req.body)
  var download = new Download()
  download.save()
  return res.render('pages/download-edit', {
    title: 'Edit Download',
    download,
  });
});

router.post('/update', async function(req, res) {
  var download = await Download.findByIdAndUpdate(req.body.id, {
    $set: {
      version: req.body.version,
      // url: req.body.url,
      type: req.body.type,
      name: req.body.name
    }
  }, {new: true}).exec()
  return res.redirect(`/download/edit/${ download.id }`);
})

router.get('/json', async function(req, res) {
  var downloads = await Download.find().exec()
  res.json(downloads)
});

router.get('/edit/:id', async function(req, res) {
  var download = await Download.findById(req.params.id).exec()
  res.render('pages/download-edit', {
    title: 'Edit',
    download
  });
});



module.exports = router
