const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')

const rootDir = path.resolve(__dirname, '../test/unit')
const buildPath = path.resolve(rootDir, 'dist')

module.exports = {
  entry: path.resolve(rootDir, 'visual.js'),
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
        test: /.jsx?$/,
        loaders: 'babel-loader',
        include: [
          path.join(__dirname, '../src'),
          rootDir
        ]
      },
      {
        test: /.vue$/,
        loader: 'vue-loader'
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
