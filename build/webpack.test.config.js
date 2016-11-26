const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, '../test/visual/main.js'),
  output: {
    path: path.resolve(__dirname, '../test/visual/dist'),
    filename: 'bundle.js'
  },
  devtool: '#eval-source-map'
}
