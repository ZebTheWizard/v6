var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')

aws.config.update({
  accessKeyId: config.get('S3_KEY'),
  secretAccessKey: config.get('S3_SECRET'),
  bucket: config.get('S3_BUCKET'),
  region: config.get('S3_REGION'),
})

var s3 = new aws.S3()


var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.get('S3_BUCKET'),
    key: function (req, file, done) {
      console.log(file);
      done(null, file.orginalname)
    }
  })
})
