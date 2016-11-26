import Vue from 'vue/dist/vue'
import Hello from 'src/Hello.vue'

describe('Hello.vue', function () {
  it('hello')
  it('pass', function () {
    const vm = new Vue({
      el: this.DOMElement,
      template: `
<div class="test-dom-container" id="${this.DOMElement.id}">
  <Hello ref="hello"></Hello>
</div>
`,
      components: { Hello }
    })
    vm.$refs.hello.n = 4
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
