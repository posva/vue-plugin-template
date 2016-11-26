import 'style-loader!css-loader!mocha-css'
import 'style-loader!css-loader!./helpers/style.css'

import 'mocha/mocha.js'
import chai from 'chai'
window.mocha.setup('bdd')
chai.should()

beforeEach(function () {
  this.DOMElement = document.createElement('DIV')
  this.DOMElement.id = `test-${Math.floor(Math.random() * 1000000)}`
  document.body.appendChild(this.DOMElement)
})

afterEach(function () {
  const testReportElements = document.getElementsByClassName('test')
  const lastReportElement = testReportElements[testReportElements.length - 1]

  if (!lastReportElement) return
  const el = document.getElementById(this.DOMElement.id)
  lastReportElement.appendChild(el)
})

var specsContext = require.context('./specs', true)
specsContext.keys().forEach(specsContext)

window.mocha.checkLeaks()
window.mocha.run()
