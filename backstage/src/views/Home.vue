<template>
  <div>
    <!-- 首页主页 -->
    <h1>这是首页</h1>
    <TableTdImg :src="'/api/download/img/' + srcs[0]" @change="change" />
  </div>
</template>

<script lang="ts">
import TableTdImg from "../components/list/ImgBigShow.vue";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      srcs: ["1160649048748478.jpg"],
    };
  },
  methods: {
    change(item: string) {
      this.srcs = this.srcs.filter((it) => {
        it = "/api/download/img/" + it;
        return it !== item;
      });
    },
  },
  components: {
    TableTdImg,
  },
});
</script>

<style></style>
