class Cookie {
  constructor () {
    var cookies = document.cookie.split(';')
    this.cookies = this.cookies || new Object()
    cookies.forEach(cookie => {
      var [key, value] = cookie.split('=')
      this.cookies[key] = value
    })
  }
  get(key) {
    return this.cookies[key]
  }
}

module.exports = new Cookie()
