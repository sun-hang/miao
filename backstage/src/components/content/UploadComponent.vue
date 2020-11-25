<template>
  <div style="width:100%;">
    <div class="upload-box">
      <div
        class="item"
        :style="{
          animation: 'items 1s forwards',
          animationDelay: index * 0.1 + 's',
        }"
        v-for="(item, index) in imgsrc"
        :key="item + index"
      >
        <img :src="'/api/download/img/' + item" alt="" />
        <div class="drop">
          <i
            class="el-icon-zoom-in"
            @click="showView('/api/download/img/' + item)"
          ></i>
          <i class="el-icon-delete" @click="removeImg(item)"></i>
        </div>
      </div>
      <div class="inp-box" @click="fileInpClick">
        <i class="el-icon-plus"></i>
        <input
          type="file"
          :name="name ? name : 'image'"
          ref="inp"
          :multiple="multiple ? multiple : ''"
          @change="inpChangeFun"
          v-if="multiple"
        />
        <input
          type="file"
          :name="name ? name : 'image'"
          ref="inp"
          v-else
          @change="inpChangeFun"
        />
      </div>
      <div class="view" v-show="isShowView">
        <i class="el-icon-close" @click="colesView"></i>
        <img :src="viewSrc" alt="" />
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["name", "multiple", "action", "autoUpload", "success", "onChange"],
  data() {
    return {
      fileList: [],
      imgsrc: [],
      viewSrc: "",
      isShowView: false,
    };
  },
  methods: {
    colesView() {
      this.isShowView = false;
    },
    showView(src: string) {
      this.viewSrc = src;
      this.isShowView = true;
    },
    removeImg(src: string) {
      this.imgsrc = this.imgsrc.filter((item) => {
        return item != src;
      });
    },
    fileInpClick() {
      let inp: any = this.$refs.inp;
      inp.click();
    },
    onSubmit() {
      if (!this.action) {
        return;
      }
      let formdata = new FormData();
      let name = this.name ? this.name : "image";
      for (let i = 0; i < this.fileList.length; i++) {
        const element = this.fileList[i];
        formdata.append(name, element);
      }
      fetch(this.action, {
        method: "post",
        body: formdata,
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => {
          let list = res.data.srcList;
          this.imgsrc = [...this.imgsrc, ...list] as never[];
          this.success && this.success(this.imgsrc);
        });
    },
    inpChangeFun(e: any) {
      this.fileList = [...e.target.files] as never[];
      if (this.autoUpload) {
        this.onSubmit();
      }
      this.onChange && this.onChange();
    },
    closeImgList() {
      this.imgsrc = [];
    },
  },
});
</script>

<style>
/* 整个容器的样式 */
.upload-box {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-wrap: wrap;
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
  margin: 10px;
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
  margin: 10px;
  opacity: 0;
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
  overflow: auto;
  left: 0;
  top: 0;
  transition: all 0.5s;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
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
.upload-box .view .el-icon-close:hover {
  color: #f40;
}

@keyframes items {
  0% {
    opacity: 0;
    transform: translateY(-50%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
