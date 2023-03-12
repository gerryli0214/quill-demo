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
        path: 'designer',
        name: 'designer',
        component: () => import('../views/designer/Question.vue')
      },
      {
        path: 'quill',
        name: 'quill',
        component: () => import('../views/demo/Quill.vue')
      },
      {
        path: 'flexible',
        name: 'flexible',
        component: () => import('../views/demo/Flexible.vue')
      },
      {
        path: 'drag',
        name: 'drag',
        component: () => import('../views/demo/Drag.vue')
      },
      {
        path: 'preview',
        name: 'preview',
        component: () => import('../views/preview/Preview.vue')
      }
    ]
  }
]

export default new VueRouter({
  routes
})