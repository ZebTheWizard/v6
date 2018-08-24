var io = require('socket.io-client')(window.location.protocol + '//' + window.location.hostname + ':8000')
var socket = io.connect()

class Socket {
  constructor(arg) {
    if (typeof arg === "object") {
      this.$room = arg.room || null
      this.$type = arg.type || null
      this.$data = arg.data || {}
    } else if (typeof arg === "string") {
      this.$room = null
      this.$type = arg
      this.$data = {}
    }
    this.$before = function () {}
    this.$onMessageCb = {}
    socket.on('message', (msg) => {
      this.$messageReceived(msg)
    })
  }

  room (str) {
    this.$room = str
    return this
  }

  of (str) {
    this.$type = str
    return this
  }

  message (obj) {
    this.$data = obj
    return this
  }

  before (cb) {
    this.$before = cb
    return this
  }

  onMessage(type, cb) {
    this.$onMessageCb[type] = cb
    // console.log(this.$onMessage.Type);
  }

  $messageReceived(msg) {
    if (this.$onMessageCb[msg.type]) this.$onMessageCb[msg.type](msg)
  }

  subscribe() {
    socket.emit('subscribe', this.$room)
  }

  send() {
    return new Promise((resolve, reject) => {
      try {
        var args = {room: this.$room, type: this.$type, data: this.$data }
        this.$before(args)
        socket.emit('send', args)
        return resolve(args)
      } catch (e) {
        return reject(e)
      }
    });
  }
}

module.exports = Socket

