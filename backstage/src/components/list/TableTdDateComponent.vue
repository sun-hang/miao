<template>
  <el-span>{{ date }}</el-span>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["item"],
  computed: {
    date() {
      let date = new Date(+this.item);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
    },
  },
});
</script>

<style></style>
