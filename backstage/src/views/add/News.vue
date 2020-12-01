<template>
  <div class="news-box">
    <h1>添加新闻页</h1>
    <div class="form-box">
      <Input
        title="新闻标题"
        placeholder="请输入新闻标题"
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
        title="新闻简介"
        placeholder="请输入新闻简介"
        type="textarea"
        :autosize="{ minRows: 2 }"
        :value="synopsis"
        :key="synopsis + 'synopsis'"
        @change="
          (item) => {
            this.synopsis = item;
          }
        "
      />
      <Input
        title="新闻内容"
        placeholder="请输入新闻内容"
        type="textarea"
        :value="content"
        :key="content + 'content'"
        :autosize="{ minRows: 4 }"
        @change="
          (item) => {
            this.content = item;
          }
        "
      />
      <el-row>
        <el-col :span="4">添加标签：</el-col>
        <el-col :span="20" :style="{ textAlign: 'left' }">
          <el-tag
            :key="tag"
            v-for="tag in tags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
            >+ 添加新标签</el-button
          >
        </el-col>
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
import { upload } from "../utli";
import Input from "../../components/content/Input.vue";
export default Vue.extend({
  data() {
    return {
      title: "",
      synopsis: "",
      content: "",
      tags: [],
      ctime: "",
      imgsrc: "",
      inputVisible: false,
      inputValue: "",
    };
  },
  components: {
    Input,
  },
  methods: {
    handleClose(tag: string) {
      this.tags.splice(this.tags.indexOf(tag as never), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        let ref: any = this.$refs.saveTagInput;
        ref.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.tags.push(inputValue as never);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    upImageSuccess(response: any, file: any, fileList: any) {
      this.imgsrc = response.data.srcList[0];
    },
    onError(err: any) {
      this.errorAlert("上传失败", "图片上传失败：" + err);
    },
    onUpLoad() {
      if (!this.title) {
        this.errorAlert("验证失败", "新闻标题为空");
        return;
      }
      if (!this.content) {
        this.errorAlert("验证失败", "新闻内容为空");
        return;
      }
      if (!this.synopsis) {
        this.errorAlert("验证失败", "新闻简介为空");
        return;
      }
      if (!this.imgsrc) {
        this.errorAlert("验证失败", "图片地址为空");
        return;
      }

      let data = {
        title: this.title,
        content: this.content,
        synopsis: this.synopsis,
        imgsrc: this.imgsrc,
        tag: this.tags.toString(),
        ctime: Date.now() + "",
      };
      let self = this;

      upload(
        "/api/news",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        },
        () => {
          let upload: any = self.$refs.upload;
          upload.clearFiles();
          self.title = "";
          self.content = "";
          self.synopsis = "";
          self.imgsrc = "";
          self.tags = [];
        },
        this
      );
    },
    onReset() {
      this.title = "";
      this.synopsis = "";
      this.content = "";
      this.tags = [];
      this.ctime = "";
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
.news-box {
  margin-bottom: 40px;
}
.news-box h1 {
  font-size: 20px;
  text-align: left;
}
.news-box .form-box {
  width: 75%;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  margin: 0 auto;
}

.news-box .form-box .el-row {
  margin: 10px 0;
}

.news-box .form-box .el-col {
  line-height: 40px;
}
.news-box .form-box .el-col.title {
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
