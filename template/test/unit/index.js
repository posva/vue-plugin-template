// Polyfill fn.bind() for PhantomJS
import bind from 'function-bind'
/* eslint-disable no-extend-native */
Function.prototype.bind = bind

// Polyfill Object.assign for PhantomJS
import objectAssign from 'object-assign'
Object.assign = objectAssign

// require all src files for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
const srcContext = require.context('../../src', true, /^\.\/(?!index(\.js)?$)/)
srcContext.keys().forEach(srcContext)

// Use a div to insert elements
before(function () {
  const el = document.createElement('DIV')
  el.id = 'tests'
  document.body.appendChild(el)
})

// Remove every test html scenario
afterEach(function () {
  const el = document.getElementById('tests')
  ;[...el.children].forEach(el.removeChild.bind(el))
})

const specsContext = require.context('./specs', true)
specsContext.keys().forEach(specsContext)
