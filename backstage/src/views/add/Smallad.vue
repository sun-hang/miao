<template>
  <div class="smallad-box">
    <h1>添加首屏广告二</h1>
    <div class="form-box">
      <Input
        title="广告主标题"
        placeholder="请输入广告主标题"
        type="text"
        :value="title"
        :key="title"
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
      <Input
        title="产品价格"
        placeholder="请输入产品价格"
        type="number"
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
      priceIcon: "",
    };
  },
  methods: {
    onUpLoad() {},
    onReset() {
      this.title = "";
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
