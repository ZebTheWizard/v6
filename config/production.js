module.exports = {
  "env": process.env.NODE_ENV,
  "recaptcha": {
    "key": process.env.RECAPTCHA_KEY,
    "secret": process.env.RECAPTCHA_SECRET,
  },
  "twitter": {
    "key": process.env.TWITTER_KEY,
    "secret": process.env.TWITTER_SECRET,
    "callback": process.env.TWITTER_CALLBACK
  },
  "github": {
    "key": process.env.GITHUB_KEY,
    "secret": process.env.GITHUB_SECRET,
    "callback": process.env.GITHUB_CALLBACK
  },
  "dropbox": {
    "key": process.env.DROPBOX_KEY,
    "secret": process.env.DROPBOX_SECRET,
    "oauth": process.env.DROPBOX_OAUTH
  },
  "s3": {
    "key": process.env.S3_KEY,
    "secret": process.env.S3_SECRET,
    "region": process.env.S3_REGION,
    "bucket": process.env.S3_BUCKET
  },
  "MONGODB_URI": process.env.MONGO_URL || process.env.MONGODB_URI,
  "SESSION_KEY": process.env.SESSION_KEY,
  "title": process.env.APP_TITLE || "IOS Haven"
}
