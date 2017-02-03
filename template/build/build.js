const rollup = require('rollup').rollup
const vue = require('rollup-plugin-vue')
const jsx = require('rollup-plugin-jsx')
const buble = require('rollup-plugin-buble')
const replace = require('rollup-plugin-replace')
const uglify = require('uglify-js')
const CleanCSS = require('clean-css')
const packageData = require('../package.json')
const { version, author, name } = packageData
// remove the email at the end
const authorName = author.replace(/\s+<.*/, '')

const {
  logError,
  write,
  processStyle
} = require('./utils')

const banner =
      '/*!\n' +
      ` * ${name} v${version}\n` +
      ` * (c) ${new Date().getFullYear()} ${authorName}\n` +
      ' * Released under the MIT License.\n' +
      ' */'

rollup({
  entry: 'src/index.js',
  plugins: [
    vue({
      compileTemplate: true,
      css (styles, stylesNodes) {
        Promise.all(
          stylesNodes.map(processStyle)
        ).then(css => {
          const result = css.map(c => c.css).join('')
          // write the css for every component
          // TODO add it back if we extract all components to individual js
          // files too
          // css.forEach(writeCss)
          write(`dist/${name}.css`, result)
          write(`dist/${name}.min.css`, new CleanCSS().minify(result).styles)
        }).catch(logError)
      }
    }),
    jsx({ factory: 'h' }),
    replace({
      __VERSION__: version,
      'process.env.NODE_ENV': 'production'
    }),
    buble()
  ]
}).then(function (bundle) {
  var code = bundle.generate({
    format: 'umd',
    exports: 'named',
    banner: banner,
    moduleName: name
  }).code
  return write(`dist/${name}.js`, code).then(function () {
    return code
  })
}).then(function (code) {
  var minified = uglify.minify(code, {
    fromString: true,
    output: {
      preamble: banner,
      ascii_only: true // eslint-disable-line camelcase
    }
  }).code
  return write(`dist/${name}.min.js`, minified)
}).catch(logError)
