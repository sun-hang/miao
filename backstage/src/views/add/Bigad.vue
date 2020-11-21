<template>
  <div class="bigad-box">
    <h1>添加首屏广告一</h1>
    <div class="form-box">
      <Input
        title="广告标题"
        placeholder="请输入广告标题"
        type="text"
        @change="
          (item) => {
            this.title = item;
          }
        "
      />
      <Input
        title="广告简介"
        placeholder="请输入广告简介"
        type="textarea"
        :autosize="{ minRows: 2 }"
        @change="
          (item) => {
            this.synopsis = item;
          }
        "
      />
      <Input
        title="广告内容"
        placeholder="请输入广告内容"
        type="textarea"
        :autosize="{ minRows: 4 }"
        @change="
          (item) => {
            this.content = item;
          }
        "
      />
      <Upload
        name="image"
        title="广告展示图"
        @change="
          (item) => {
            this.imgsrc = item;
          }
        "
        ref="upload"
      ></Upload>
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
import Upload from "../../components/content/UploadImage.vue";
import Input from "../../components/content/Input.vue";
export default Vue.extend({
  components: {
    Input,
    Upload,
  },
  data() {
    return {
      title: "",
      content: "",
      synopsis: "",
      imgsrc: "",
    };
  },
  methods: {
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
                upload.closeImgList();
                self.title = "";
                self.content = "";
                self.synopsis = "";
                self.imgsrc = "";
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
