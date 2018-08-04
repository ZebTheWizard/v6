var exec = require('child-process-promise').exec
var plist = require('plist')
var unzip = require('unzip')
var fs = require('mz/fs')
var tmp = require('tmp')
var pngdefry = require('pngdefry')


function defry(input, output) {
  return new Promise(function(resolve, reject) {
    pngdefry(input, output, async function (err) {
      if (err) return reject(err)
      var data =  await fs.readFile(output)
      return resolve(data)
    })
  });
}

module.exports = async function (buffer) {
  return new Promise((resolve, reject) => {
    tmp.file(async function (err, ipapath, fd, cleanup) {
      if (err) throw err;
      await fs.writeFile(ipapath, buffer)

      var { stdout } = await exec(`tar -tvf "${ipapath}" | rev | cut -d ' ' -f1 | rev | grep 'Payload/.*app/$'`)

      var plistPath = stdout.trim() + 'Info.plist'
      var { stdout } = await exec(`unzip -p "${ipapath}" "${plistPath}"`)

      try {
        var json = plist.parse(stdout)
      } catch (e) {
        return reject('corrupt plist')
      }

      try {
        var possibleImage = json.CFBundleIcons.CFBundlePrimaryIcon.CFBundleIconFiles[0]
      } catch (e) {
        var possibleImage = json.CFBundleIconFile
      }

      var { stdout } = await exec(`tar -tvf ${ipapath} | grep "${possibleImage}" | tail -n1 | rev | cut -d ' ' -f1 | rev`)
      var imagePath = stdout.trim()
      var { stdout } = await exec(`unzip -p "${ipapath}" "${imagePath}" > "${ipapath}.png"`)

      var iconBinary = await defry(ipapath + '.png', ipapath + '.defry.png')

      await fs.unlink(ipapath + '.png')
      await fs.unlink(ipapath + '.defry.png')

      cleanup()

      resolve({
        ipapath,
        iconBinary,
        "iconExtension": imagePath.split('.').reverse()[0],
        "plist": json
      })

      })
    })

}
