var langs = require('./langs.json')

module.exports = {
  name (code) {
    return langs[code.toLowerCase()].name
  },
  native (code) {
    return langs[code.toLowerCase()].nativeName
  }
}
