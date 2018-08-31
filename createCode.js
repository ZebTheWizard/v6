const readline = require('readline')
const Time = require('./lib/time')
const config = require('./config')
const mongoose = require('mongoose');
mongoose.connect(config.get('MONGODB_URI'), { useNewUrlParser: true });
const Code = mongoose.model('Code', require('./models/code'))

function ask(q) {
  return new Promise(function(resolve, reject) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    rl.question(q + '\n> ', answer => {
      resolve(answer)
      rl.close()
    })
  });
}

(async function main() {
  var c = new Code()
  c.code = await ask('What do you want the code to be?')
  c.expiresDaysAfterCreated = parseInt(await ask('How many days should the code last?'))
  await c.save()
  console.log('Code created successfully!');
  process.exit()
})()
