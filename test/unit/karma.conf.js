// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html

const node = require('rollup-plugin-node-resolve')
const cjs = require('rollup-plugin-commonjs')
const vue = require('rollup-plugin-vue')
const buble = require('rollup-plugin-buble')
const replace = require('rollup-plugin-replace')
const istanbul = require('rollup-plugin-istanbul')

module.exports = function (config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec', 'coverage'],
    files: ['./index.js', './specs/**/*.spec.js'],
    preprocessors: {
      './index.js': ['rollup'],
      './specs/**/*.spec.js': ['rollup']
    },
    rollupPreprocessor: {
      plugins: [
        replace({
          'process.env.VUE_ENV': "'browser'",
          'process.env.NODE_ENV': "'testing'"
        }),
        vue({
          compileTemplate: false,
          sourceMap: 'inline',
          css: false
        }),
        istanbul({
          include: ['src/**/*.{js,vue}']
          // exclude: ['test/**/*.js', 'node_modules/**/*']
        }),
        node(),
        cjs(),
        buble()
      ],
      // will help to prevent conflicts between different tests entries
      format: 'iife',
      // sourceMap: 'inline'
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
  })
}
