<template>
  <div class="left-menu-box">
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :default-active="getIndex"
      class="left-menu"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-circle-plus-outline"></i>
          <span>数据列表</span>
        </template>
        <el-menu-item index="/list/bigad">
          <router-link to="/list/bigad">首屏广告一</router-link>
        </el-menu-item>
        <el-menu-item index="/list/smallad">
          <router-link to="/list/smallad">首屏广告二</router-link>
        </el-menu-item>
        <el-menu-item index="/list/bigpic">
          <router-link to="/list/bigpic">首屏大图</router-link>
        </el-menu-item>
        <el-menu-item index="/list/comment">
          <router-link to="/list/comment">评论列表</router-link>
        </el-menu-item>
        <el-menu-item index="/list/news">
          <router-link to="/list/news">新闻列表</router-link>
        </el-menu-item>
        <el-menu-item index="/list/product">
          <router-link to="/list/product">产品列表</router-link>
        </el-menu-item>
        <el-menu-item index="/list/purchaselog">
          <router-link to="/list/purchaselog">购物记录列表</router-link>
        </el-menu-item>
        <el-menu-item index="/list/shoppingcart">
          <router-link to="/list/shoppingcart">购物车列表</router-link>
        </el-menu-item>
        <el-menu-item index="/list/useradmin">
          <router-link to="/list/useradmin">用户列表</router-link>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-circle-plus-outline"></i>
          <span>操作数据</span>
        </template>
        <el-menu-item index="/add/bigad">
          <router-link to="/add/bigad">添加首屏广告一</router-link>
        </el-menu-item>
        <el-menu-item index="/add/smallad">
          <router-link to="/add/smallad">添加首屏广告二</router-link>
        </el-menu-item>
        <el-menu-item index="/add/bigpic">
          <router-link to="/add/bigpic">添加首屏大图</router-link>
        </el-menu-item>
        <el-menu-item index="/add/comment">
          <router-link to="/add/comment">添加评论</router-link>
        </el-menu-item>
        <el-menu-item index="/add/news">
          <router-link to="/add/news">添加新闻</router-link>
        </el-menu-item>
        <el-menu-item index="/add/product">
          <router-link to="/add/product">添加产品</router-link>
        </el-menu-item>
        <el-menu-item index="/add/purchaselog">
          <router-link to="/add/purchaselog">添加购物记录</router-link>
        </el-menu-item>
        <el-menu-item index="/add/shoppingcart">
          <router-link to="/add/shoppingcart">添加购物车</router-link>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  computed:{
    getIndex(){
      try {
        let path = location.pathname;
      if(path === '/'){
        path = ''
      }
      return path;
      } catch (error) {
        console.log(error)
        return '';
      }
      
    }
  }
});
</script>
<style>
.left-menu-box {
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
}
.left-menu {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.left-menu a {
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  height: 100%;
}

/* .left-menu a.router-link-exact-active {
  color: #ffd04b;
} */
</style>
