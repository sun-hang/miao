<template>
  <div class="upload-box">
    <div class="item">
      <img src="/api/download/img/1160630241614384.jpg" alt="" />
      <div class="drop">
        <i class="el-icon-zoom-in"></i>
        <i class="el-icon-delete"></i>
      </div>
    </div>
    <div class="inp-box">
      <i class="el-icon-plus"></i>
      <input
        type="file"
        :name="name ? name : 'image'"
        ref="inp"
        :multiple="multiple ? multiple : ''"
      />
    </div>
    <div class="view">
      <i class="el-icon-close"></i>
      <img src="/api/download/img/1160630241614384.jpg" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["name", "multiple", "action", "auto-upload"],
  data() {
    return {
      fileList: [],
    };
  },
});
</script>

<style>
/* 整个容器的样式 */
.upload-box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  width: 100%;
}

/* 文本框的样式 */
.upload-box .inp-box {
  width: 135px;
  height: 135px;
  border-radius: 5px;
  border: 1px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
}

.upload-box .inp-box:hover {
  border: 2px dashed rgb(4, 216, 216);
}

.upload-box .inp-box input {
  display: none;
}
.upload-box .inp-box i {
  color: aqua;
  font-size: 32px;
}

/* 图片展示列表样式 */

.upload-box .item {
  width: 135px;
  height: 135px;
  border-radius: 5px;
  border: 1px solid #ccc;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
}
.upload-box .item img {
  width: 100%;
}

.upload-box .item .drop {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.5s;
  justify-content: center;
  align-items: center;
  display: flex;
  opacity: 0;
}

.upload-box .item .drop i {
  font-size: 18px;
  color: #fff;
  margin: 0 5px;
  cursor: pointer;
}
.upload-box .item .drop i:hover {
  color: rgba(24, 85, 252, 0.972);
}
.upload-box .item:hover .drop {
  opacity: 1;
}

/* 图片查看容器部分样式 */

.upload-box .view {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  /* display: none; */
}
.upload-box .view img {
  width: 40%;
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;
  margin: auto;
  border: 30px solid #fff;
}

.upload-box .view .el-icon-close {
  position: absolute;
  color: #333;
  top: 21%;
  z-index: 1;
  right: 29%;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
}
.upload-box .view .el-icon-close:hover{
  color: #f40;
}
</style>
