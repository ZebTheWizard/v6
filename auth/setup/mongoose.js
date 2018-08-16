const { Strategy } = require('passport-custom')
var config = require('config');
const { User } = require('../../models')
const argon2 = require('argon2')

module.exports = new Strategy( async function (req, done) {
  console.log(req.body.payload);
  var user = await User.findById(req.body.payload).exec()
  console.log(user);
  done(null, user)
})
