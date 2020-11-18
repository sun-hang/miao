<template>
  <el-row class="inner-header">
    <el-col class="log-box" :span="4">
      <img src="../../assets/1.jpg" alt="" />
    </el-col>
    <el-col class="title-box" :span="12">我的商场管理页</el-col>
    <el-col class="user-box" :span="8"
      ><el-button round plain size="mini" @click="onLogin" v-if="!userInfo"
        >登录</el-button
      >
      <span v-else>[{{ userInfo.loginUser }}]</span>
      <el-button round plain size="mini" style="margin-left:10px;" @click="onOutLogin" v-if="userInfo">退出登录</el-button>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
export default Vue.extend({
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    onLogin() {
      if (this.$route.path !== "/login") {
        this.$router.push("/login");
      }
    },
    onOutLogin() {
      this.$store.dispatch('outLogin')
    },
  },
  data() {
    return {};
  },
});
</script>

<style>
.inner-header {
  height: 60px;
}

.inner-header div {
  height: 60px;
}

.inner-header .title-box {
  font-size: 18px;
  letter-spacing: 0.5em;
  text-align: left;
  padding-left: 5px;
  font-weight: 600;
  box-sizing: border-box;
}
.inner-header .log-box {
  text-align: left;
  line-height: 60px;
  position: relative;
}
.inner-header .log-box img {
  height: 40px;
  width: 40px;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.inner-header .user-box {
  text-align: right;
}
</style>
