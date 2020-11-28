<template>
  <el-popover placement="top" width="60" v-model="visible">
    <div style="text-align: center; margin: 0">
      <p>确定删除此条数据吗？</p>
      <el-button size="mini" type="success" @click="noDel">取消</el-button>
      <el-button type="primary" size="mini" @click="yesDel">确定</el-button>
    </div>
    <el-button type="danger" size="mini" slot="reference">删除</el-button>
  </el-popover>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["item"],
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    noDel() {
      this.visible = false;
    },
    yesDel(){
        this.visible = false;
        this.$emit('change',this.item);
    }
  },
});
</script>

<style></style>
