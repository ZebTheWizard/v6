module.exports = {
  "env": process.env.NODE_ENV,
  "twitter": {
    "key": process.env.TWITTER_KEY,
    "secret": process.env.TWITTER_SECRET
  },
  "MONGODB_URI": process.env.MONGODB_URI,
  "title": process.env.APP_TITLE || "IOS Haven"
}
