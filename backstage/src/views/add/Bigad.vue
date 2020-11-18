<template>
  <div class="bigad-box">
    <h1>添加首屏广告一</h1>
    <div class="form-box">
      <el-row>
        <el-col :span="4" class="title">广告标题：</el-col>
        <el-col :span="20"
          ><el-input
            :suffix-icon="titleIcon"
            validate-event
            v-model.trim="title"
            placeholder="请输入广告标题"
            @blur="onBulrTitle"
          ></el-input
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="title">广告简介：</el-col>
        <el-col :span="20"
          ><el-input
            @blur="onBulrContent"
            v-model.trim="content"
            type="textarea"
            :autosize="{ minRows: 2 }"
            placeholder="请输入广告标题"
          ></el-input
        ></el-col>
        <el-col
          :offset="4"
          :style="{
            color: content ? '#0f0' : '#f00',
            fontSize: '12px',
            height: '20px',
          }"
          >{{ contentIcon }}</el-col
        >
      </el-row>
      <el-row>
        <el-col :span="4" class="title">广告内容：</el-col>
        <el-col :span="20"
          ><el-input
            @blur="onBulrSynopsis"
            v-model.trim="synopsis"
            type="textarea"
            placeholder="请输入广告标题"
            :autosize="{ minRows: 4 }"
          ></el-input
        ></el-col>
        <el-col
          :offset="4"
          :style="{
            color: synopsis ? '#0f0' : '#f00',
            fontSize: '12px',
            height: '20px',
          }"
          >{{ synopsisIcon }}</el-col
        >
      </el-row>
      <el-row>
        <el-col class="title" :span="4">
          广告展示图：
        </el-col>
        <el-col :span="20">
          <el-upload
            class="upload-demo"
            action="/api/updata/images"
            list-type="picture"
            name="image"
            :on-success="upImageSuccess"
            :on-error="onError"
            ref="upload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" :offset="4">
          <el-button @click="onUpLoad">添加</el-button>
          <el-button @click="onReset">重置</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      title: "",
      content: "",
      synopsis: "",
      titleIcon: "",
      contentIcon: "",
      synopsisIcon: "",
      imgsrc: "",
    };
  },
  methods: {
    onBulrTitle() {
      this.titleIcon = this.title ? "el-icon-success" : "el-icon-error";
    },
    onBulrContent() {
      this.contentIcon = this.content ? "内容格式正确" : "广告简介不能为空";
    },
    onBulrSynopsis() {
      this.synopsisIcon = this.synopsis ? "内容格式正确" : "广告内容不能为空";
    },
    upImageSuccess(response: any, file: any, fileList: any) {
      this.imgsrc = response.data.srcList[0];
    },
    onError(err: any) {
      this.errorAlert("上传失败", "图片上传失败：" + err);
    },
    onUpLoad() {
      if (!this.title) {
        this.errorAlert("验证失败", "广告标题为空");
        return;
      }
      if (!this.content) {
        this.errorAlert("验证失败", "广告内容为空");
        return;
      }
      if (!this.synopsis) {
        this.errorAlert("验证失败", "广告简介为空");
        return;
      }
      if (!this.imgsrc) {
        this.errorAlert("验证失败", "图片地址为空");
        return;
      }
      fetch("/api/bigad", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: this.title,
          synopsis: this.synopsis,
          content: this.content,
          imgsrc: this.imgsrc,
        }),
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => {
          let self = this;
          if (res.data) {
            this.$notify({
              title: "添加成功",
              type: "success",
              message: "成功添加一条数据",
              onClose() {
                let upload: any = self.$refs.upload;
                upload.clearFiles();
                self.title = "";
                self.content = "";
                self.synopsis = "";
                self.imgsrc = "";
                self.contentIcon = "";
                self.synopsisIcon = '';
                self.titleIcon = "";
              },
            });
          } else {
            this.$notify({
              title: "添加失败",
              type: "error",
              message: res.data,
            });
          }
        });
    },
    onReset() {
      this.title = "";
      this.content = "";
      this.synopsis = "";
      this.imgsrc = "";
    },
    errorAlert(title: string, message: string) {
      this.$notify({
        title: title,
        type: "warning",
        message: message,
      });
    },
  },
});
</script>

<style>
.bigad-box h1 {
  font-size: 20px;
  text-align: left;
}
.bigad-box .form-box {
  width: 75%;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  margin: 0 auto;
}

.bigad-box .form-box .el-row {
  margin: 10px 0;
}

.bigad-box .form-box .el-col {
  line-height: 40px;
}
.bigad-box .form-box .el-col.title {
  text-align: right;
}
</style>
