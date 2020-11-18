<template>
  <div class="bigad-box">
    <h1>添加首屏广告一</h1>
    <div class="form-box">
      <el-row>
        <el-col :span="4" class="title">广告标题：</el-col>
        <el-col :span="20"><el-input placeholder="请输入广告标题"></el-input></el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="title">广告简介：</el-col>
        <el-col :span="20"><el-input type="textarea" :autosize="{ minRows: 2}" placeholder="请输入广告标题"></el-input></el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="title">广告内容：</el-col>
        <el-col :span="20"><el-input type="textarea" placeholder="请输入广告标题" :autosize="{ minRows: 3}"></el-input></el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
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

.bigad-box .form-box .el-row{
    margin: 10px 0;
}

.bigad-box .form-box .el-col {
  line-height: 40px;
}
.bigad-box .form-box .el-col.title {
    text-align: right;
}
</style>
