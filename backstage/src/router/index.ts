import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    // 登录页
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    // 新闻页
    path: '/add/news',
    name: 'AddNews',
    component: () => import('../views/add/News.vue')
  },
  {
    // 产品页
    path: '/add/product',
    name: 'AddProduct',
    component: () => import('../views/add/Product.vue')
  },
  {
    path: '/add/shoppingcart',
    name: 'AddShoppingCart',
    component: () => import('../views/add/ShoppingCart.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
