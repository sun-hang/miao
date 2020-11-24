<template>
  <div class="upload-box">
    <div class="inp-box">
      <input type="file" name="" id="" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["name", "multiple", "action", "auto-upload"],
  data() {
    return {
      fileList: [],
    };
  },
});
</script>

<style></style>
