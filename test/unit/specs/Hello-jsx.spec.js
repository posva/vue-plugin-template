import Vue from 'vue'
import Hello from '../../../src/Hello.jsx'

describe('Hello.jsx', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(Hello)
    })
    console.log(vm.$el)
    expect(vm.$el.querySelector('h1').textContent).to.contain('Hello JSX')
  })
})
