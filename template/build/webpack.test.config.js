const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')

const rootDir = path.resolve(__dirname, '../test/unit')
const buildPath = path.resolve(rootDir, 'dist')

module.exports = {
  entry: {
    bundle: path.resolve(rootDir, 'visual.js')
  },
  output: {
    path: buildPath,
    filename: '[chunkhash].[name].js',
    chunkFilename: '[id].[chunkhash].js'
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
    new StyleLintPlugin({
      configFile: path.join(__dirname, '../.stylelintrc'),
      failOnError: false,
      files: ['**/*.{vue,css}']
    }),
    new HtmlWebpackPlugin({
      chunkSortMode: 'dependency'
    }),
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
