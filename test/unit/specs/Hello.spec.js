import Hello from '../../../src/Hello.vue'
import { createVM, register } from '../helpers/utils.js'

register('Hello', Hello)

describe('Hello.vue', function () {
  it('should render correct contents', function () {
    const vm = createVM(this, `
<Hello></Hello>
`)
    vm.$el.querySelector('.hello h1').textContent.should.eql('Hello World!')
  })
})
