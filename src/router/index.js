import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Users',
    component: () => import( '../views/Users.vue')
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import( '../views/User.vue')
  },
    {
        path: '*',
        name: 'notFound',
        component: () => import( '../views/Page404.vue')
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
