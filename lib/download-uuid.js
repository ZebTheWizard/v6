var uuid = require('uuid/v4')

module.exports = {
  regen (req) {
    return req.session._token = uuid();
  },
  check (req, u) {
    return req.session._token === u
  }
}
