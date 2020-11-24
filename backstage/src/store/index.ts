import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null, //用户登录信息
    productId: null //产品id
  },
  mutations: {
    getUserInfo(state, info) {
      state.userInfo = info
    },
    getProductId(state, info) {
      state.productId = info;
    }
  },
  actions: {
    async getUserInfo({ commit, state }, info) {
      const result = await fetch('/api/myuser/login', {
        method: 'post',
        body: JSON.stringify(info),
        headers: {
          'Content-Type': "application/json"
        },
        credentials: 'include'
      }).then(res => res.json())
      if (result.data) {
        commit('getUserInfo', result.data);
        return true;
      } else {
        return false
      }
    },
    async getWhoami({ commit }) {
      const result = await axios({
        url: 'http://127.0.0.1:9527/api/myuser/whoami',
        method: "POST",
        withCredentials: true
      })
      if (result.data.data) {
        commit('getUserInfo', result.data.data);
      }
    },

    async outLogin({ commit }) {
      const result = await fetch('/api/myuser/out', {
        credentials: 'include'
      }).then(res => res.json())
      if (result.data) {
        commit('getUserInfo', null);
      }
    }
  },
  modules: {
  }
})
