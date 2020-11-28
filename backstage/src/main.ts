import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
let pathname: string = '';
store.dispatch('getWhoami').then(() => {
  router.replace(pathname);
})
router.beforeEach((to, from, next) => {
  if(to.path == '/'){
    next('/home');
    return;
  }
  if (!pathname && (from.path !== '/login' && from.path !== '/home')) {
    pathname = to.path;
    next('/404')
    return;
  }
  if (!store.state.userInfo && (to.path !== '/login' && to.path !== '/home')) {
    next('/login')
  } else {
    next();
  }
})

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
