
function readUInt64BE(buffer, start) {
  return buffer.slice(start, start + 8).readUInt32BE(4, 8);
}

function readUInt(buffer, start=0) {
  var l = 0;
  for (var i = start; i < buffer.length; i++) {
    l <<= 8
    l |= buffer[i] & 0xFF
  }
  return l
}

function parseBuffer(buffer) {
  var header = buffer.slice(0, 6).toString('utf8')
  if (header !== 'bplist') return {}
  var trailer = buffer.slice(buffer.length - 32, buffer.length)
  var offsetSize = trailer.readUInt8(6)
  var objectRefSize = trailer.readUInt8(7)
  var numObjects = readUInt64BE(trailer, 8)
  var topObject = readUInt64BE(trailer, 16)
  var offsetTableOffset = readUInt64BE(trailer, 24)

  var offsetTable = []
  for (var i = 0; i < numObjects; i++) {
    var offsetBytes = buffer.slice(offsetTableOffset + i * offsetSize, offsetTableOffset + (i + 1) * offsetSize)
    offsetTable[i] = readUInt(offsetBytes, 0)
    // console.log("Offset for Object #" + i + " is " + offsetTable[i] + " [" + offsetTable[i].toString(16) + "]");
  }

  function parseObject(tableOffset) {
    var offset = offsetTable[tableOffset]
    var type = buffer[offset]
    var objType = (type & 0xF0) >> 4
    var objInfo = (type & 0x0F)
    console.log({offset, type, objType, objInfo});
  }
  // console.log({trailer, offsetSize, objectRefSize, numObjects, topObject, offsetTableOffset});
  return [ parseObject(topObject) ]
}



module.exports = {
  parseBuffer,
}
