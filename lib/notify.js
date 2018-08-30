var Socket = require('./sockets')
var socket = new Socket

function notifyUser (user, data) {
  notifyById(user._id || user.id, data)
}

function notifyById (id, data) {
  socket.room('/notification/' + id).message(data).of('notification').send()
}

module.exports = {
  notifyById,
  notifyUser
}
