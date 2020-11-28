<template>
  <div class="img-box">
    <el-popover placement="top" width="60" v-model="visible">
      <div style="text-align: center; margin: 0">
        <el-button size="mini" type="success" @click="showView">查看</el-button>
        <el-button type="primary" size="mini" @click="dblclickFun"
          >删除</el-button
        >
      </div>
      <img class="item" slot="reference" :src="newSrc" alt="" />
    </el-popover>
    <div class="view" v-show="isShowView">
      <i class="el-icon-close" @click="colesView"></i>
      <img :src="newSrc" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["src"],
  data() {
    return {
      isShowView: false,
      visible: false,
    };
  },
  computed: {
    newSrc() {
      let src: string = this.src as string;
      return "/api/download/img/" + src;
    },
  },
  methods: {
    colesView() {
      this.isShowView = false;
    },
    showView() {
      this.visible = false;
      this.isShowView = true;
    },
    dblclickFun() {
      this.visible = false;
      this.$emit("change", this.src);
    },
  },
});
</script>

<style>
.img-box {
  width: 48px;
  height: 48px;
  border-radius: 2px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
}
.img-box img.item {
  width: 100%;
}

.img-box .view {
  width: 100vw;
  height: 100vh;
  position: fixed;
  overflow: auto;
  left: 0;
  top: 0;
  transition: all 0.5s;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  /* display: none; */
}
.img-box .view img {
  width: 40%;
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;
  margin: auto;
  border: 30px solid #fff;
}

.img-box .view .el-icon-close {
  position: absolute;
  color: #333;
  top: 21%;
  z-index: 1;
  right: 29%;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
}
.img-box .view .el-icon-close:hover {
  color: #f40;
}
</style>
