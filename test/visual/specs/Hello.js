import Vue from 'vue/dist/vue'
import Hello from 'vue-loader!../../../src/Hello.vue'

describe('Hello.vue', function () {
  it('hello')
  it('pass', function () {
    const vm = new Vue({
      el: this.DOMElement,
      template: `
<div class="test-dom-container" id="${this.DOMElement.id}">
  <Hello></Hello>
</div>
`,
      components: { Hello }
    })
    vm.n = 100
    true.should.be.true
  })

  it('fails', function () {
    const vm = new Vue({
      el: this.DOMElement,
      template: `
<div class="test-dom-container" id="${this.DOMElement.id}">
  <Hello></Hello>
</div>
`,
      components: { Hello }
    })
    vm
    false.should.be.true
  })
})
