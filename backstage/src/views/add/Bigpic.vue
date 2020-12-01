<template>
  <div class="bigpic-box">
    <h1>添加首屏大图</h1>
    <div class="upload-box">
      <el-upload
        drag
        name="image"
        action="/api/updata/images"
        :with-credentials="true"
        show-file-list
        :on-success="uploadImage"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { upload } from "../utli";
export default Vue.extend({
  methods: {
    async uploadImage(response: any, file: any, fileList: any) {
      upload(
        "/api/bigpic",
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ imgsrc: response.data.srcList[0] }),
        },
        () => {},
        this
      );
    },
  },
});
</script>

<style>
.bigpic-box h1 {
  font-size: 20px;
  text-align: left;
}
</style>
