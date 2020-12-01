<template>
  <div class="search-box">
    <el-input
      placeholder="请输入内容"
      v-model="value"
      class="input-with-select"
      @blur="btnClick"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="btnClick"
      ></el-button>
    </el-input>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data(){
        return {
            value:""
        }
    },
    methods:{
        btnClick(){
            this.$emit('click',this.value)
        }
    }
});
</script>

<style>
.search-box {
  margin: 0 0 10px 0;
}

</style>
