import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeComponent from '../views/HomeComponent.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeComponent,
    beforeRouteEnter: (to, from, next) => {
      if (to.name == 'taskList') next(false)
      else next()
      console.log(to.name)
    },

  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutComponent.vue')
  },
  {
    path: '/taskList',
    name: 'taskList',
    component: () => import('../views/TaskListComponent.vue')
  },
  {
    path: '/task/:id',
    name: 'task',
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
