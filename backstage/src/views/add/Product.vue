<template>
  <div class="product-box">
    <h1>这是产品</h1>
    <div class="form-box">
      <!-- 产品名称 -->
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
      <!-- 产品原价 -->
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
      <!-- 产品现价 -->
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
      <!-- 产品简介 -->
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
      <!-- 产品详情 -->
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
      <!-- 添加标签 -->
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
      <!-- 列表展示图上传 -->
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
      <!-- 产品页展示大图 -->
      <el-row>
        <el-col :span="4">展示大图：</el-col>
        <el-col :span="20">
          <el-upload
            action="/api/updata/images"
            list-type="picture-card"
            name="image"
            multiple
            ref="listImgSrc"
            :on-success="onUploadChangeListImgSrc"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <template v-for="item in listImgSrc">
                <img
                  :key="item.url"
                  class="el-upload-list__item-thumbnail"
                  :src="'/api/download/img/' + item.name"
                  alt=""
                />
                <span class="el-upload-list__item-actions" :key="item.url + 1">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(item)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <a :href="item.url"
                    ><span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleDownload(item)"
                    >
                      <i class="el-icon-download"></i>
                    </span>
                  </a>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemoveListImgSrc(item)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </template>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-col>
      </el-row>
      <!-- 产品页详情展示图 -->
      <el-row>
        <el-col :span="4">产品介绍大图：</el-col>
        <el-col :span="20">
          <el-upload
            action="/api/updata/images"
            list-type="picture-card"
            name="image"
            multiple
            :on-success="onUploadChangeSynopsisList"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <template v-for="item in synopsisList">
                <img
                  :key="item.url"
                  class="el-upload-list__item-thumbnail"
                  :src="'/api/download/img/' + item.name"
                  alt=""
                />
                <span class="el-upload-list__item-actions" :key="item.url + 1">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(item)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <a :href="item.url"
                    ><span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleDownload(item)"
                    >
                      <i class="el-icon-download"></i>
                    </span>
                  </a>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemoveSynopsisList(item)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </template>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-col>
      </el-row>
      <!-- 产品页上传视频页 -->
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
      <!-- 点击按钮们 -->
      <el-row style="margin-top:20px;">
        <el-col :offset="4" :span="20">
          <el-button @click="updataClick">提交</el-button>
          <el-button>添加产品子项</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Input from "../../components/content/Input.vue";
import Upload from "../../components/content/UploadImage.vue";
import { errorAlert, upload } from "../utli";
export default Vue.extend({
  data() {
    return {
      inputValue: "", //添加标签文本框双向绑定的值
      inputVisible: false, //是否显示文本框的锁
      productName: "", //产品名称
      originalPrice: null, //产品原价
      nowPrice: null, //产品现价
      synopsis: "", //产品简介
      detail: "", //产品详情
      adImgSrc: "", //产品列表展示图
      tags: [], //产品标签
      dialogImageUrl: "", //上传图片列表查看大图路径
      dialogVisible: false, //上传图片列表锁
      disabled: false, //图片列表按钮显示锁
      listImgSrc: [], //大图展示图片列表
      synopsisList: [], //介绍图片列表
      videoSrc: "", //上传视频地址
    };
  },
  methods: {
    // 删除图片列表项
    handleRemoveListImgSrc(file: string) {
      let listImgSrc = this.listImgSrc.filter((item) => {
        return item !== file;
      });
      this.listImgSrc = listImgSrc;
    },
    handleRemoveSynopsisList(file: string) {
      let synopsisList = this.synopsisList.filter((item) => {
        return item !== file;
      });
      this.synopsisList = synopsisList;
    },
    // 展示列表大图
    handlePictureCardPreview(file: any) {
      this.dialogImageUrl = "/api/download/img/" + file.name;
      this.dialogVisible = true;
    },
    // 下载列表展示图
    handleDownload(file: any) {
      console.log(file, this.listImgSrc);
      console.log(file.name);
      fetch("/api/download/" + file.name).then((res) => {
        console.log(res);
      });
    },
    // 上传图片列表
    onUploadChangeListImgSrc(response: any, file: any, fileList: any) {
      let arr: any[] = response.data.srcList;
      arr = arr.map((item) => {
        return { name: item, url: "/api/download/img/" + item };
      });
      this.listImgSrc.push(...(arr as []));
    },
    // 产品介绍图上传
    onUploadChangeSynopsisList(response: any, file: any, fileList: any) {
      let arr: any[] = response.data.srcList;
      arr = arr.map((item) => {
        return { name: item, url: "/api/download/img/" + item };
      });
      this.synopsisList.push(...(arr as []));
    },
    //视频上传变换事件
    onVideoChange(e: any) {
      let formdata = new FormData();
      let self = this;
      formdata.append("files", e.target.files[0]);
      fetch("http://127.0.0.1:9527/api/updata/file", {
        method: "POST",
        body: formdata,
        credentials: "include",
      })
        .then((res) => res.json())
        .then(
          (res) => {
            self.videoSrc = res.data.srcList[0];
            self.$notify({
              title: "上传成功",
              type: "success",
              message: "视频成功上传到服务器，地址:" + self.videoSrc,
            });
          },
          (err) => {
            console.log(err, "err");
          }
        );
    },
    // 视频上传按钮点击事件
    onVideoBtn() {
      let inp: any = this.$refs.inp;
      inp.click();
    },
    // 删除标签事件
    handleClose(tag: string) {
      this.tags.splice(this.tags.indexOf(tag as never), 1);
    },
    // 添加标签事件
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.tags.push(inputValue as never);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    // 显示添加标签文本框
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        let ref: any = this.$refs.saveTagInput;
        ref.$refs.input.focus();
      });
    },
    // 添加数据点击按钮
    updataClick() {
      // 验证参数
      if (!this.productName) {
        errorAlert("验证失败", "产品名为空", this);
        return;
      }

      if (!this.nowPrice) {
        errorAlert("验证失败", "产品价格为空", this);
        return;
      }

      if (!this.synopsis) {
        errorAlert("验证失败", "产品简介为空", this);
        return;
      }

      if (!this.adImgSrc) {
        errorAlert("验证失败", "产品列表展示图地址为空", this);
        return;
      }
      if (this.listImgSrc.length < 1) {
        errorAlert("验证失败", "产品展示图地址为空", this);
        return;
      }

      if (this.synopsisList.length < 1) {
        errorAlert("验证失败", "产品详情简介图地址为空", this);
        return;
      }

      if(this.videoSrc){
        this.listImgSrc.unshift(this.videoSrc as never);
      }

      fetch("/api/product", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName: this.productName,
          originalPrice: this.originalPrice,
          nowPrice: this.nowPrice,
          listImgSrc: JSON.stringify(
            this.listImgSrc.map((item: any) => {
              return item.name;
            })
          ),
          adImgSrc: this.adImgSrc,
          synopsis: this.synopsis,
          synopsisImgSrc: JSON.stringify(
            this.synopsisList.map((item: any) => {
              return item.name;
            })
          ),
          detail: this.detail,
          tag: this.tags.toString(),
        }),
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => {
          this.$store.commit('getProductId',res.data.id);
          let listImgSrc:any = this.$refs.listImgSrc;
          listImgSrc.clearFiles();
          this.listImgSrc = []; 
        });
    },
    // 添加产品数据按钮
    addProdcutDataClick() {

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
