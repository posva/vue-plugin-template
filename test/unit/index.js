// Polyfill fn.bind() for PhantomJS
import bind from 'function-bind'
/* eslint-disable no-extend-native */
Function.prototype.bind = bind

// Polyfill Object.assign for PhantomJS
import objectAssign from 'object-assign'
Object.assign = objectAssign

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
/* eslint-disable no-unused-vars */
import * as plugin from '../../src'

const specsContext = require.context('./specs', true)
specsContext.keys().forEach(specsContext)
