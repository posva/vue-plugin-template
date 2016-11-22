import Vue from 'vue/dist/vue'
import Hello from '../../../src/components/Hello.vue'

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(Hello)
    })
    expect(vm.$el.querySelector('.hello h1').textContent).to.contain('Hello World!')
  })
})
