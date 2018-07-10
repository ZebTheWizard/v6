module.exports = {
  "env": process.env.NODE_ENV,
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
  "MONGODB_URI": process.env.MONGO_URL,
  "title": process.env.APP_TITLE || "IOS Haven"
}
