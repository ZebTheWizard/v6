var { Dropbox } = require('dropbox');
var config = require('../config');

// console.log(config.get('dropbox.oauth'));
module.exports = new Dropbox({
  accessToken: config.get('dropbox.oauth')
})
