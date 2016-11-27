import HelloJsx from '../../../src/Hello.jsx'
import { createVM, register } from '../helpers/utils.js'

register('HelloJsx', HelloJsx)

describe('Hello.jsx', function () {
  it('should render correct contents', function () {
    const vm = createVM(this, `
<HelloJsx></HelloJsx>
`)
    vm.$el.querySelector('h1').textContent.should.eql('Hello JSX')
  })

  it('renders JSX too', function () {
    const vm = createVM(this, h => (
      <hello-jsx></hello-jsx>
    ))
    vm.$el.querySelector('h1').textContent.should.eql('Hello JSX')
  })
})
