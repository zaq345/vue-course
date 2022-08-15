import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeComponent from '../views/HomeComponent.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeComponent
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutComponent.vue')
  },
  {
    path: '/taskList',
    name: 'taskList',
    component: () => import('../views/TaskListComponent.vue')
  },
  {
    path: '/task/:id',
    name: 'taskList',
    component: () => import('../views/TaskComponent.vue')
  },
  {
    path: '*',
    name: 'Error404',
    component: () => import('../views/Error404Component.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
