import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home/designer'
  },
  {
    path: '/home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: 'quill',
        name: 'quill',
        component: () => import('../views/demo/Quill.vue')
      }
    ]
  }
]

export default new VueRouter({
  routes
})