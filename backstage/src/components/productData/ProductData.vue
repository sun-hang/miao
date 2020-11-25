<template>
  <div class="add-productdata-box">
    <h1>添加产品数据</h1>
    <div class="form-box">

    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Input from "../content/Input.vue";
import UploadImage from "../content/UploadImage.vue";
export default Vue.extend({
  data() {
    return {};
  },
  components: {
    Input,
    UploadImage,
  },
});
</script>

<style>
.add-productdata-box h1 {
  font-size: 20px;
  text-align: left;
}
.add-productdata-box .form-box {
  width: 75%;
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
