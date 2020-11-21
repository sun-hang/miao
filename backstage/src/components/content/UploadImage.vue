<template>
  <el-row>
    <el-col class="title" :span="4"> {{ title }}： </el-col>
    <el-col :span="20">
      <el-upload
        class="upload-demo"
        action="/api/updata/images"
        list-type="picture"
        :name="getName"
        :on-success="upImageSuccess"
        :on-error="onError"
        ref="upload"
        with-credentials
        show-file-list
        :multiple="getMultiple"
        :drag="getDrag"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import Vue from "vue";
import { errorAlert } from "../../views/utli";
export default Vue.extend({
  props: ["name", "multiple", "drag", "title"],
  data() {
    return {};
  },
  methods: {
    upImageSuccess(response: any, file: any, fileList: any) {
      this.$emit("change", response.data.srcList[0]);
    },
    onError(err: any) {
      errorAlert("上传失败", "图片上传失败：" + err, this);
    },
    closeImgList() {
      let upload: any = this.$refs.upload;
      upload.clearFiles();
    },
  },
  computed: {
    getName() {
      return this.name ? this.name : "image";
    },
    getMultiple() {
      return this.multiple ? this.multiple : false;
    },
    getDrag() {
      return this.drag ? this.drag : false;
    },
  },
});
</script>

<style>
</style>