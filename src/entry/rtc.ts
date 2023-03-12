import Vue from 'vue'
import Rtc from '../web-rtc.vue'
import 'normalize.css'
import '../styles/public.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'amfe-flexible/index'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(Rtc)
})