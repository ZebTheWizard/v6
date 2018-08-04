var aws = require('aws-sdk')
var config = require('../config');



class S3 {
  constructor(options) {
    this.client = new aws.S3(options)
    this.options = options
  }

  putObject(options) {
    return new Promise((resolve, reject) => {
      this.client.putObject(options, (err, data) => {
        if (err) {
          console.log(err);
          return reject(err)
        }
        return resolve({data, url: this.getURL(options.Key), key: options.Key})
      })
    });
  }

  deleteObject(options) {
    return new Promise((resolve, reject) => {
      this.client.deleteObject(options, (err, data) => {
        if (err) {
          console.log(err);
          return reject(err)
        }
        return resolve(data)
      })
    });
  }

  getSignedUrl(operation, params) {
    return new Promise((resolve, reject) => {
      this.client.getSignedUrl(operation, params, function (err, data) {
        if (err) {
          console.log(err);
          return reject(err)
        }
        return resolve(data)
      })
    });
  }

  getURL(path) {
    return `https://s3.${this.options.credentials.region}.amazonaws.com/${this.options.bucket}/${path}`
  }
}


module.exports = new S3({
  credentials: {
    accessKeyId: config.get('s3.key'),
    secretAccessKey: config.get('s3.secret'),
    region: config.get('s3.region')
  },
  bucket: config.get('s3.bucket')
})
