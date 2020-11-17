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
    // 新闻页
    path: '/list/news',
    name: 'ListNews',
    component: () => import('../views/list/News.vue')
  },
  {
    // 首页大广告
    path: '/add/bigad',
    name: 'AddBigad',
    component: () => import('../views/add/Bigad.vue')
  },
  {
    // 首页大广告
    path: '/list/bigad',
    name: 'ListBigad',
    component: () => import('../views/list/Bigad.vue')
  },
  {
    // 首页大图
    path: '/add/bigpic',
    name: 'AddBigpic',
    component: () => import('../views/add/Bigpic.vue')
  },
  {
    // 首页大图
    path: '/list/bigpic',
    name: 'ListBigpic',
    component: () => import('../views/list/Bigpic.vue')
  },
  {
    // 购物记录
    path: '/add/purchaselog',
    name: 'AddPurchaselog',
    component: () => import('../views/add/Purchaselog.vue')
  },
  {
    // 购物记录
    path: '/list/purchaselog',
    name: 'ListPurchaselog',
    component: () => import('../views/list/Purchaselog.vue')
  },
  {
    // 首页小广告
    path: '/add/smallad',
    name: 'AddSmallad',
    component: () => import('../views/add/Smallad.vue')
  },
  {
    // 首页小广告
    path: '/list/smallad',
    name: 'ListSmallad',
    component: () => import('../views/list/Smallad.vue')
  },
  {
    // 产品页
    path: '/add/product',
    name: 'AddProduct',
    component: () => import('../views/add/Product.vue')
  },
  {
    // 产品页
    path: '/list/product',
    name: 'ListProduct',
    component: () => import('../views/list/Product.vue')
  },
  {
    path: '/add/shoppingcart',
    name: 'AddShoppingCart',
    component: () => import('../views/add/ShoppingCart.vue')
  },
  {
    path: '/list/comment',
    name: 'ListComment',
    component: () => import('../views/list/Comment.vue')
  },
  {
    path: '/list/shoppingcart',
    name: 'ListShoppingCart',
    component: () => import('../views/list/ShoppingCart.vue')
  },

  {
    path: '/list/useradmin',
    name: 'ListUserAdmin',
    component: () => import('../views/list/ShoppingCart.vue')
  },
  {
    path: '*',
    component: () => import('../views/Error.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
