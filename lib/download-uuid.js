var uuid = require('uuid/v4')

module.exports = {
  regen (req) {
    return req.session.download = uuid();
  },
  check (req, u) {
    return req.session.download === u
  }
}
