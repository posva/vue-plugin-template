const path = require('path')
const fs = require('fs')
const pkg = require('../package.json')
const { red, logError } = require('./utils/log.js')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

const rootDir = path.resolve(__dirname, '../test/unit')
const buildPath = path.resolve(rootDir, 'dist')

const dllName = pkg.dllPlugin.name

if (!fs.existsSync(path.join(buildPath, dllName) + '.dll.js')) {
  logError(red('The DLL manifest is missing. Please run `npm run build:dll` (Quit this with `q`)'))
  process.exit(0)
}

const dllManifest = require(
  path.join(buildPath, dllName) + '.json'
)

module.exports = {
  entry: {
    tests: path.resolve(rootDir, 'visual.js')
  },
  output: {
    path: buildPath,
    filename: '[name].js',
    chunkFilename: '[id].js'
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
        loader: 'babel-loader',
        include: [
          path.join(__dirname, '../src'),
          rootDir
        ]
      },
      {
        test: /.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: [require('postcss-cssnext')()]
        }
      }
    ]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, '..'),
      manifest: dllManifest
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"testing"',
        VERSION: `'${pkg.version}'`
      }
    }),
    new HtmlWebpackPlugin({
      chunkSortMode: 'dependency'
    }),
    new AddAssetHtmlPlugin({ filepath: require.resolve(
      path.join(buildPath, dllName) + '.dll.js'
    ) }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module, count) {
        return (
          module.resource &&
            /\.js$/.test(module.resource) &&
            module.resource.indexOf(path.join(__dirname, '../node_modules/')) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    new DashboardPlugin()
  ],
  devServer: {
    inline: true,
    stats: {
      colors: true,
      chunks: false,
      cached: false
    },
    contentBase: buildPath
  },
  devtool: '#eval-source-map',
  performance: {
    hints: false
  }
}
