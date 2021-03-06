var io = require('socket.io')()
io.attach(8000)

io.on('connect', socket => {
  socket.on('subscribe', room => {
    console.log('\n==========\nuser joined: ' + room + '\n==========\n');
    socket.join(room)
  })

  socket.on('unsubscribe', room => {
    console.error('\n==========\nuser left: ' + room + '\n==========\n');
    socket.leave(room)
  })

  socket.on('send', data => {
    console.log(data.room + ' ->', data);
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
        console.log(this.$room + ' -> ', this);
        // console.log('server sent message to room: ', this);
        return resolve(args)
      } catch (e) {
        console.log(e);
        return reject(e)
      }
    });
  }
}

module.exports = Socket
