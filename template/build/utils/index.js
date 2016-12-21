const write = require('./write.js')
const processStyle = require('./processStyle.js')

function logError (e) {
  console.log(e)
}

module.exports = {
  write,
  processStyle,
  logError
}
