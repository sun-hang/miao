<template>
  <div class="add-productdata-box">
    <h1 v-if="!productId" style="text-align:center;">产品为空，请先添加产品</h1>
    <div class="form-box" v-else>
      <el-row>
        <el-col :span="4" class="title">产品名称：</el-col>
        <el-col :span="20" style="border:1px solid #ccc;border-radius: 5px;">{{
          productId.productName
        }}</el-col>
      </el-row>
      <Input title="数据名称" type="text" @change="textChange" />
      <Input title="产品价格" type="number" @change="priceChange" />
      <UploadImage
        ref="bigImg"
        title="产品小图"
        name="image"
        @change="bigImgChange"
      />
      <UploadImage
        ref="smallImg"
        title="产品大图"
        name="image"
        @change="smallImgChange"
      />
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
import Input from "../content/Input.vue";
import UploadImage from "../content/UploadImage.vue";
import { mapState } from "vuex";
import { errorAlert, upload } from "../../views/utli";
export default Vue.extend({
  data() {
    return {
      text: "",
      price: null,
      bigImgSrc: "",
      smallImgSrc: "",
    };
  },
  computed: {
    ...mapState(["productId"]),
  },
  components: {
    Input,
    UploadImage,
  },
  methods: {
    textChange(value: string) {
      this.text = value;
    },
    priceChange(value: any) {
      this.price = value;
    },
    bigImgChange(src: string) {
      this.bigImgSrc = src;
    },
    smallImgChange(src: string) {
      this.smallImgSrc = src;
    },
    onUpLoad() {
      if (!this.text) {
        errorAlert("数据验证失败", "数据名称为空", this);
        return;
      }

      if (!this.price) {
        errorAlert("数据验证失败", "产品价格为空", this);
        return;
      }

      if (!this.bigImgSrc) {
        errorAlert("数据验证失败", "产品展示大图地址为空", this);
        return;
      }

      if (!this.smallImgSrc) {
        errorAlert("数据验证失败", "产品展示小图地址为空", this);
        return;
      }
      let data = {
        productId: this.productId.id,
        text: this.text,
        price: this.price,
        bidImgSrc: this.bigImgSrc,
        smallImgSrc: this.smallImgSrc,
      };
      console.log(data);
      upload(
        "/api/productdata",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        },
        () => {
          this.onReset();
        },
        this
      );
    },
    onReset() {
      this.text = "";
      this.price = null;
      this.bigImgSrc = "";
      this.smallImgSrc = "";
      let bigImg: any = this.$refs.bigImg;
      let smallImg: any = this.$refs.smallImg;
      bigImg.closeImgList();
      smallImg.closeImgList();
    },
  },
});
</script>

<style>
.add-productdata-box h1 {
  font-size: 20px;
  text-align: center;
}
div.add-productdata-box .form-box {
  width: 95%;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  margin: 0 auto;
}

.add-productdata-box .form-box .el-row {
  margin: 10px 0;
}

.add-productdata-box .form-box .el-col {
  line-height: 40px;
}
.add-productdata-box .form-box .el-col.title {
  text-align: right;
}
</style>
