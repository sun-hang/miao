<template>
  <div class="login-box">
    <div class="login">
      <el-row>
        <el-col :span="6">用户名：</el-col>
        <el-col :span="18"
          ><el-input
            placeholder="请输入用户名"
            @blur="onUserChangeFun"
            v-model="loginUser"
          ></el-input
          ><i class="el-icon-check" v-show="userIsTrue"></i>
          <i class="el-icon-close" v-show="userIsFalse"></i>
          <span class="msg" v-show="userIsFalse">账号不能为空或格式不对</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">密码：</el-col>
        <el-col :span="18"
          ><el-input
            placeholder="请输入密码"
            v-model="loginPassWord"
            @blur="onPassChangeFun"
          ></el-input>
          <i class="el-icon-check" v-show="passIsTrue"></i>
          <i class="el-icon-close" v-show="passIsFalse"></i>
          <span class="msg" v-show="passIsFalse">密码为空或格式不正确</span>
        </el-col>
      </el-row>
      <el-row
        ><el-col :span="9" :offset="6"
          ><el-button @click="onClick">登录</el-button></el-col
        ><el-col :span="9"><el-button @click="onReset">重置</el-button></el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      loginUser: "",
      loginPassWord: "",
      userIsTrue: false,
      passIsTrue: false,
      userIsFalse: false,
      passIsFalse: false,
    };
  },
  methods: {
    onUserChangeFun() {
      this.loginUser = this.loginUser.trim();
      if (this.loginUser.length > 4) {
        this.userIsTrue = true;
        this.userIsFalse = false;
      } else {
        this.userIsFalse = true;
        this.userIsTrue = false;
      }
    },
    onPassChangeFun() {
      this.loginPassWord = this.loginPassWord.trim();
      if (
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,16}$/.test(this.loginPassWord)
      ) {
        this.passIsTrue = true;
        this.passIsFalse = false;
      } else {
        this.passIsFalse = true;
        this.passIsTrue = false;
      }
    },
    onReset() {
      this.loginUser = "";
      this.loginPassWord = "";
    },
    async onClick() {
      if (this.userIsTrue && this.passIsTrue) {
        const result = await this.$store.dispatch("getUserInfo", {
          loginPassword: this.loginPassWord,
          loginUser: this.loginUser,
        });
        // console.log(result);
        if (result) {
          this.$notify({
            title: "成功",
            message: "登录成功",
            type: "success",
          });
          setTimeout(() => {
            this.$router.push("/");
          }, 3000);
        } else {
          this.$notify({
            title: "登录失败",
            message: "账号或密码错误",
            type: "error",
          });
        }
      }
    },
  },
});
</script>

<style>
.login-box {
  position: relative;
  width: 100%;
  height: 100%;
}
.login {
  width: 40%;
  min-width: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-60%, -60%);
}
.login .el-row {
  margin: 10px 0;
}
.login i,
.login span.msg {
  color: red;
  margin-right: 5px;
  font-size: 12px;
}
</style>
