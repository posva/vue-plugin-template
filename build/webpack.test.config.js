const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')

const buildPath = path.resolve(__dirname, '../test/visual/dist')
const bubleOptions = {
  objectAssign: 'Object.assign'
}

module.exports = {
  entry: path.resolve(__dirname, '../test/visual/main.js'),
  output: {
    path: buildPath,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.jsx', 'css'],
    alias: {
      'src': path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loaders: 'buble-loader',
        include: [
          path.join(__dirname, '../src'),
          path.join(__dirname, '../test/visual')
        ],
        query: bubleOptions
      },
      {
        test: /.vue$/,
        loader: 'vue-loader',
        options: {
          buble: bubleOptions
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new DashboardPlugin()
  ],
  devServer: {
    inline: true,
    contentBase: buildPath
  },
  devtool: '#eval-source-map'
}
