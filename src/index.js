import Hello from './components/Hello.vue'
import Ripple from './components/Ripple.vue'

function unused () {
  return 'Im never called'
}
unused

export default Hello

if (window.Vue) {
  window.Vue.component('Ripple', Ripple)
}
