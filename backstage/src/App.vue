<template>
  <div id="app">
    <el-container class="container">
      <el-header class="header"><Header /></el-header>
      <el-container class="inner-container">
        <el-aside :width="width + 'px'" class="aside">
          <LeftMenu />
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import LeftMenu from "./components/leftMenu/LeftMenu.vue";
import Header from "./components/header/Header.vue";
export default Vue.extend({
  data() {
    return {
      width: 220,
    };
  },
  components: {
    LeftMenu,
    Header,
  },
});
</script>
<style>
:root,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100%;
  max-height: 100vh;
}
.container {
  width: 100%;
  height: 100%;
}
.inner-container {
  height: calc(100vh - 60px);
}
.header.el-header {
  background: #545c64;
  color: #fff;
  border-bottom: 1px solid #ccc;
  line-height: 60px;
  padding: 0 40px;
  box-shadow: 1px 2px 6px rgba(255, 255, 255, 0.8);
}
.aside {
  width: 100px;
  overflow: auto;
  box-sizing: border-box;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
