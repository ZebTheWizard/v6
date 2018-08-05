var { Dropbox } = require('dropbox');
var config = require('../config');

// console.log(config.get('dropbox.oauth'));
var d = new Dropbox({
  accessToken: config.get('dropbox.oauth')
})

uploadSession = async function(options, cb) {
  var stream = options.stream
  var offset = options.offset || 0
  var chunk = stream.chunks[offset]
  var session_id = options.session_id || 0
  var chunkSize = options.chunkSize || chunk.length
  var path = options.path

  if (stream.chunks.length < 3) {
    console.log(stream.buffer.length);
    chunkSize = Math.ceil(stream.buffer.length / 3)
    stream = bufferToStream(stream.buffer, chunkSize)
    chunk = stream.chunks[offset]
  }

  if (offset === 0) { // start of buffer
    try {
      var res = await d.filesUploadSessionStart({ close: false, contents: chunk})
      session_id = res.session_id
      cb({
        chunk,
        progress: (offset + 1) / stream.chunks.length * 100,
        done: false
      })
    } catch (e) {console.log(e)}

  } else if (offset < stream.chunks.length - 1) { // reading buffer, more to come
    try {
      await d.filesUploadSessionAppendV2({
        cursor: { session_id: session_id, offset: offset * chunkSize},
        close: false,
        contents: chunk
      })
      cb({
        chunk,
        progress: (offset + 1) / stream.chunks.length * 100,
        done: false
      })
    } catch (e) {console.log(e)}
  } else { // end of buffer
    try {
      var data = await d.filesUploadSessionFinish({
        cursor: { session_id: session_id, offset: offset * chunkSize},
        commit: {path: path},
        contents: chunk
      })
      cb({
        chunk,
        progress: (offset + 1) / stream.chunks.length * 100,
        done: true,
        data
      })
    } catch (e) {console.log(e)}
  }
  if (offset < stream.chunks.length - 1) return uploadSession({ path, stream, chunkSize, offset: offset + 1, session_id }, cb)
}

d.uploadSession = function (options, cb) {
  return new Promise(function(resolve, reject) {
    uploadSession(options, function(data) {
      cb(data)
      if (data.done) return resolve(data.data)
    })
  });
}


module.exports = d
