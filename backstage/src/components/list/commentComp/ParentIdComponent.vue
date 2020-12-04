<template>
  <div>
    <span v-if="item">
      {{ item.loginUser }}
    </span>
    <span v-else>数据为空</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["parentid"],
  data() {
    return {
      item: null,
    };
  },
  mounted() {
    if (!this.parentid) {
      return;
    }
    fetch("/api/user/" + this.parentid, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then(res => res.json()).then(res=>{
        console.log(res);
        this.item = res.data;
    })
  },
});
</script>
<style></style>
