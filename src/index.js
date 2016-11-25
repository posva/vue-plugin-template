import Hello from './Hello.vue'
import HelloJsx from './Hello.jsx'

function unused () {
  return 'Im never called'
}
unused

export default Hello

if (window.Vue) {
  window.Vue.component('hello', Hello)
  window.Vue.component('hello-jsx', HelloJsx)
}
