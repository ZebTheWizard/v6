var io = require('socket.io-client')(window.location.protocol + '//' + window.location.hostname + ':8000')
var socket = io.connect()
// window.socket = io.connect()
//
// socket.emit('subscribe', location.pathname)
//


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
// var io = require('socket.io')()
// io.attach(8000)
//
// io.on('connect', socket => {
//   socket.on('subscribe', room => {
//     console.log('user joined room: ', room);
//     socket.join(room)
//   })
//
//   socket.on('unsubscribe', room => {
//     console.log('user left room: ', room);
//     socket.leave(room)
//   })
//
//   socket.on('send', data => {
//     console.log('user sent message to server: ', room, data);
//     io.sockets.in(data.room).emit('message', data)
//   })
// })
//
// class Socket {
//   constructor(arg) {
//     if (typeof arg === "object") {
//       this.$room = arg.room || null
//       this.$type = arg.type || null
//       this.$data = arg.data || {}
//       this.$before = arg.before || function () {}
//     } else if (typeof arg === "string") {
//       this.$room = null
//       this.$type = arg
//       this.$data = {}
//       this.$before = function () {}
//     }
//   }
//
//   room (str) {
//     this.$room = str
//     return this
//   }
//
//   type (str) {
//     this.$type = str
//     return this
//   }
//
//   message (obj) {
//     this.$data = obj
//     return this
//   }
//
//   before (cb) {
//     this.$before = cb
//     return this
//   }
//
//   send () {
//     return new Promise((resolve, reject) => {
//       try {
//         var args = { type: this.$type, data: this.$data }
//         this.$before(args)
//         socket.emit('send', {room: this.$room, type: this.$type, data:data })
//         console.log('server sent message to room: ', this.$room, this.$data);
//         return resolve(args)
//       } catch (e) {
//         console.log(e);
//         return reject(e)
//       }
//     });
//   }
// }
//
module.exports = Socket
// // function send(options) {
// //   return new Promise(async function(resolve, reject) {
// //     if (options.status === 'done') var query = { $unset: { progress: 1 }}
// //     else var query = { $set: { progress: options }}
// //     var ipa = await Ipa.findByIdAndUpdate(options.id, query, {new: true}).exec()
// //     io.sockets.in(`/download/edit/${options.id}`).emit('message', {type: 'ipa-progress-message', data: options})
// //     resolve(ipa)
// //   });
// // }
