import Vue from 'vue'
import Mobile from './Mobile.vue'
import 'normalize.css'
import './styles/public.css'
import router from './router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'amfe-flexible/index'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})