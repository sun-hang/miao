<template>
  <div class="product-box">
    <h1>这是产品</h1>
    <div class="form-box">
      <Input
        title="产品标题"
        placeholder="请输入产品标题"
        type="text"
        @change="
          (item) => {
            this.productName = item;
          }
        "
      />
      <Input
        title="产品原价"
        placeholder="请输入产品原价"
        type="number"
        @change="
          (item) => {
            this.originalPrice = item;
          }
        "
      />
      <Input
        title="产品现价"
        placeholder="请输入产品现价"
        type="number"
        @change="
          (item) => {
            this.nowPrice = item;
          }
        "
      />
      <Input
        title="产品简介"
        placeholder="请输入产品简介"
        type="textarea"
        :autosize="{ minRows: 3 }"
        @change="
          (item) => {
            this.synopsis = item;
          }
        "
      />
      <Input
        title="产品详情"
        placeholder="请输入产品详情，没有就不需要传"
        type="textarea"
        :autosize="{ minRows: 3 }"
        @change="
          (item) => {
            this.detail = item;
          }
        "
      />
      <Upload
        name="image"
        title="列表展示图"
        @change="
          (item) => {
            this.adImgSrc = item;
          }
        "
        ref="upload"
      ></Upload>
      <el-row>
        <el-col :span="4">展示大图</el-col>
        <el-col :span="20">
          <el-upload
            action="/api/updata/images"
            list-type="picture-card"
            name="image"
            multiple
            :auto-upload="true"
            :file-list="listImgSrc"
            :on-success="onUploadChange"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">添加视频：</el-col>
        <el-col :span="20">
          <input
            type="file"
            @change="onVideoChange"
            style="display:none;"
            ref="inp"
          />
          <el-button @click="onVideoBtn">点击上传</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Input from "../../components/content/Input.vue";
import Upload from "../../components/content/UploadImage.vue";
export default Vue.extend({
  data() {
    return {
      productName: "",
      originalPrice: null,
      nowPrice: null,
      synopsis: "",
      detail: "",
      adImgSrc: "",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      listImgSrc: [],
    };
  },
  methods: {
    // 删除文件列表
    handleRemove(file: any) {
      console.log(file);
    },
    // 展示列表大图
    handlePictureCardPreview(file: any) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 下载列表展示图
    handleDownload(file: any) {
      console.log(file, this.listImgSrc);
    },
    // 上传图片列表
    onUploadChange(response: any, file: any, fileList: any) {
      console.log(response);
    },
    //视频上传变换事件
    onVideoChange(e: any) {
      console.log(e);
    },
    // 视频上传按钮点击事件
    onVideoBtn() {
      let inp: any = this.$refs.inp;
      inp.click();
    },
  },
  components: {
    Input,
    Upload,
  },
});
</script>

<style>
.product-box {
  margin-bottom: 40px;
}
.product-box h1 {
  font-size: 20px;
  text-align: left;
}
.product-box .form-box {
  width: 75%;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  margin: 0 auto;
}

.product-box .form-box .el-row {
  margin: 10px 0;
}

.product-box .form-box .el-col {
  line-height: 40px;
}
.product-box .form-box .el-col.title {
  text-align: right;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
