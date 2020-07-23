import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Projection from '../views/Projection.vue'

Vue.use(VueRouter)
  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pj',
    name: 'Projection',
    component: Projection
  },
]

const router = new VueRouter({
  routes
})

export default router
