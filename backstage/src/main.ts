import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
store.dispatch('getWhoami');
router.beforeEach((to, from, next) => {
  if (!store.state.userInfo && to.path !== '/login' && to.path !== '/') {
    next('/login');
  } else {
    next()
  }
})

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
