const write = require('./write.js')
const { logError } = require('./log.js')
const { processStyle, writeCss } = require('./style.js')

module.exports = {
  write,
  processStyle,
  writeCss,
  logError
}
