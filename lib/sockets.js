var io = require('socket.io')()
io.attach(8000)

io.on('connect', socket => {
  socket.on('subscribe', room => {
    console.log('user joined room: ', room);
    socket.join(room)
  })

  socket.on('unsubscribe', room => {
    console.log('user left room: ', room);
    socket.leave(room)
  })

  socket.on('send', data => {
    console.log('user sent message to server: ', data);
    io.sockets.in(data.room).emit('message', data)
  })
})

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

  send () {
    return new Promise((resolve, reject) => {
      try {
        var args = { type: this.$type, data: this.$data }
        this.$before(args)
        io.sockets.in(this.$room).emit('message', args)
        console.log('server sent message to room: ', this);
        return resolve(args)
      } catch (e) {
        console.log(e);
        return reject(e)
      }
    });
  }
}

module.exports = Socket
// function send(options) {
//   return new Promise(async function(resolve, reject) {
//     if (options.status === 'done') var query = { $unset: { progress: 1 }}
//     else var query = { $set: { progress: options }}
//     var ipa = await Ipa.findByIdAndUpdate(options.id, query, {new: true}).exec()
//     io.sockets.in(`/download/edit/${options.id}`).emit('message', {type: 'ipa-progress-message', data: options})
//     resolve(ipa)
//   });
// }
