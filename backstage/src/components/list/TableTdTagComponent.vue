<template>
  <div class="tag-box">
    <el-tag
      size="mini"
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
    <el-button v-else class="button-new-tag" size="small" @click="showInput"
      >+ 添加新标签</el-button
    >
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["tag"],
  data() {
    return {
      inputValue: "",
      inputVisible: false,
    };
  },
  computed: {
    tags() {
      return this.tag.split(",");
    },
  },
  methods: {
    handleClose(item: string) {
      let tags = this.tags;
      tags = tags.filter((it: string) => {
        return item !== it;
      });
      console.log(tags);
      this.$emit("click", tags.toString());
    },
    handleInputConfirm() {
      let tags = this.tags;
      tags.push(this.inputValue);
      this.$emit("click", tags.toString());
      this.inputValue = "";
      this.inputVisible = false;
    },
    showInput() {
      this.inputVisible = true;
    },
  },
});
</script>

<style>
.el-tag {
  margin: 5px;
}
</style>
