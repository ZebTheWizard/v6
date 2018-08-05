var exec = require('child-process-promise').exec
var unzip = require('unzip')
var fs = require('mz/fs')
var tmp = require('tmp')
var pngdefry = require('pngdefry')
var plist = require('simple-plist')


function defry(input, output) {
  return new Promise(function(resolve, reject) {
    pngdefry(input, output, async function (err) {
      if (err) return reject(err)
      var data =  await fs.readFile(output)
      return resolve(data)
    })
  });
}

function plistToJson(path) {
  return new Promise(function(resolve, reject) {
    plist.readFile(path, function (err, data) {
      if (err) return reject(err)
      else return resolve(data)
    })
  });
}

module.exports = async function (buffer) {
  return new Promise((resolve, reject) => {
    tmp.file(async function (err, ipapath, fd, cleanup) {
      if (err) throw err;
      await fs.writeFile(ipapath, buffer)

      var { stdout } = await exec(`unzip -l "${ipapath}" | rev | cut -d ' ' -f1 | rev | grep 'Payload/.*app/$'`)
      var plistPath = stdout.trim() + 'Info.plist'
      var { stdout } = await exec(`unzip -p "${ipapath}" "${plistPath}" > "${ipapath + '.plist'}"`)

      var json = await plistToJson(ipapath + '.plist')

      try {
        var possibleImage = json.CFBundleIcons.CFBundlePrimaryIcon.CFBundleIconFiles.reverse()[0]
      } catch (e) {
        var possibleImage = json.CFBundleIconFile
      }

      var { stdout } = await exec(`unzip -l ${ipapath} | grep "${possibleImage}" | sort | tail -n1 | rev | cut -d ' ' -f1 | rev`)
      var imagePath = stdout.trim()
      var { stdout } = await exec(`unzip -p "${ipapath}" "${imagePath}" > "${ipapath}.png"`)

      var iconBinary = await defry(ipapath + '.png', ipapath + '.defry.png')

      await fs.unlink(ipapath)
      await fs.unlink(ipapath + '.png')
      await fs.unlink(ipapath + '.plist')
      await fs.unlink(ipapath + '.defry.png')

      resolve({
        ipapath,
        iconBinary,
        "iconExtension": imagePath.split('.').reverse()[0],
        "plist": json
      })

    })
  })

}
