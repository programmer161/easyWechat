import Vue from 'vue'
import VueRouter from 'vue-router'

// 实现路由的懒加载
const Home = () => import('../views/Home.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router
