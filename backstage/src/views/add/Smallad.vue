<template>
  <div class="smallad-box">
    <h1>添加首屏广告二</h1>
    <div class="form-box">
      <Input
        title="广告主标题"
        placeholder="请输入广告主标题"
        type="text"
        :value="title"
        :key="title + 'title'"
        @change="
          (item) => {
            this.title = item;
          }
        "
      />
      <Input
        title="广告辅标题"
        placeholder="请输入广告辅标题"
        type="text"
        :value="mintitle"
        :key="mintitle + 'mintitle'"
        @change="
          (item) => {
            this.mintitle = item;
          }
        "
      />
      <Input
        title="广告内容"
        placeholder="请输入广告内容"
        type="textarea"
        :autosize="{ minRows: 4 }"
        :value="content"
        :key="content + 'content'"
        @change="
          (item) => {
            this.content = item;
          }
        "
      />
      <Input
        title="产品价格"
        placeholder="请输入产品价格"
        type="number"
        :value="price"
        :key="price + 'price'"
        :autosize="{ minRows: 4 }"
        @change="
          (item) => {
            this.price = item;
          }
        "
      />

      <Upload
        name="image"
        title="广告展示图"
        ref="upload"
        @change="
          (item) => {
            this.imgsrc = item;
          }
        "
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
import { errorAlert, upload } from "../utli";
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
      mintitle: "",
      content: "",
      price: 0,
      imgsrc: "",
    };
  },
  methods: {
    onUpLoad() {
      if (!this.title) {
        errorAlert("验证错误", "广告标题为空", this);
        return;
      }

      if (!this.mintitle) {
        errorAlert("验证错误", "广告二号标题为空", this);
        return;
      }

      if (!this.price) {
        errorAlert("验证错误", "产品价格为空", this);
        return;
      }

      if (!this.content) {
        errorAlert("验证错误", "广告内容为空", this);
        return;
      }

      if (!this.imgsrc) {
        errorAlert("验证错误", "广告图片地址为空", this);
        return;
      }
      console.log({
        title: this.title,
        content: this.content,
        imgsrc: this.imgsrc,
        price: this.price,
        mintitle: this.mintitle,
      });
      upload(
        "/api/smallad",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            title: this.title,
            content: this.content,
            imgsrc: this.imgsrc,
            price: this.price,
            mintitle: this.mintitle,
          }),
        },
        (res: any) => {
          this.onReset();
        },
        this
      );
    },
    onReset() {
      this.title = "";
      this.mintitle = "";
      this.content = "";
      this.price = 0;
      this.imgsrc = "";
      let upload: any = this.$refs.upload;
      upload.closeImgList();
    },
  },
});
</script>

<style>
.smallad-box h1 {
  font-size: 20px;
  text-align: left;
}
.smallad-box .form-box {
  width: 75%;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  margin: 0 auto;
}

.smallad-box .form-box .el-row {
  margin: 10px 0;
}

.smallad-box .form-box .el-col {
  line-height: 40px;
}
.smallad-box .form-box .el-col.title {
  text-align: right;
}
</style>
