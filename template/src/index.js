import Hello from './Hello.vue'
import HelloJsx from './Hello.jsx'

export default Hello

if (window.Vue) {
  // here you should do Vue.use(YourPlugin)
  window.Vue.component('hello', Hello)
  window.Vue.component('hello-jsx', HelloJsx)
}
