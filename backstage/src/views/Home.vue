<template>
  <div>
    <!-- 首页主页 -->
    <h1>这是首页</h1>
    <upload-component></upload-component>
  </div>
</template>

<script lang="ts">
import UploadComponent from "../components/content/UploadComponent.vue";
import Vue from "vue";
export default Vue.extend({
  components: {
    UploadComponent,
  },
});
</script>

<style></style>
