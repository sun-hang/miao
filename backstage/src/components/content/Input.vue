<template>
  <el-row>
    <el-col :span="4" class="title">{{ title }}：</el-col>
    <el-col :span="20"
      ><el-input
        :type="myType"
        :suffix-icon="iconName"
        v-model.trim="inpValue"
        :autosize="autosize"
        :placeholder="placeholder"
        @blur="onBulrChange"
      ></el-input
    ></el-col>
    <el-col
      v-if="myType == 'textarea'"
      :offset="4"
      :style="{
        color: inpValue ? '#0f0' : '#f00',
        fontSize: '12px',
        height: '20px',
      }"
      >{{ msg }}</el-col
    >
  </el-row>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["title", "placeholder", "type", "autosize",'show-password'],
  data() {
    return {
      inpValue: "",
      iconName: "",
      msg: "",
    };
  },
  computed: {
    myType() {
      let type: string = this.type ? this.type : "text";
      return "" + type;
    },
    myAutosize() {
      let autosize: { minRows?: number; maxRows?: number } = this.autosize
        ? this.autosize
        : { minRows: 2 };
      return autosize;
    },
  },
  methods: {
    onBulrChange() {
      this.iconName = this.inpValue ? "el-icon-success" : "el-icon-error";
      let str: string = this.inpValue ? "内容验证成功" : "内容格式不正确";
      this.msg = str;
      this.$emit("change", this.inpValue);
    },
  },
});
</script>

<style></style>
