<template>
  <div class="td-box" @dblclick="dbClick">
    <input
      :type="type"
      v-model="inp"
      v-show="isShow"
      @keydown.enter="keyDownFun"
      @blur="keyDownFun"
    />
    <span v-show="!isShow">{{ inp }}</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["text", "type"],
  data() {
    return {
      inp: this.text,
      isShow: false,
    };
  },
  methods: {
    dbClick() {
      this.isShow = true;
    },
    keyDownFun() {
      this.isShow = false;
      this.$emit("change", this.inp);
    },
  },
});
</script>

<style>
.td-box {
  width: 100%;
  color: #444;
}
.td-box input{
    border-radius: 5px;
    border: 1px solid #666;
}
</style>
