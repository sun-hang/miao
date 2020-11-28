<template>
  <div class="td-box">
    <el-row
      ><el-col :span="12"
        ><div class="imglist">
          <ImgBigShow
            v-for="(item, index) in src"
            :key="item + index"
            :src="item"
            @change="changeFun"
          ></ImgBigShow></div></el-col
      ><el-col :span="12" style="height:48px;line-height: 48px;"
        ><el-upload
          class="upload-demo"
          action="/api/updata/images"
          with-credentials
          :show-file-list="false"
          :on-success="onChangeSuccess"
          name="image"
        >
          <el-button size="mini" type="primary">上传</el-button>
        </el-upload></el-col
      ></el-row
    >
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ImgBigShow from "./ImgBigShow.vue";
export default Vue.extend({
  props: ["text"],
  computed: {
    src() {
      let str: string = this.text;
      if (str.startsWith("[")) {
        return JSON.parse(str);
      } else {
        return str.split(",");
      }
    },
  },
  data() {
    return {};
  },
  methods: {
    changeFun(item: string) {
      let src: string[] = this.src.filter((it: string) => {
        return item !== it;
      });
      this.$emit("change", src.toString());
    },
    onChangeSuccess(response: any, file: any, fileList: any) {
        this.$emit("change",response.data.srcList[0])
    },
  },
  components: {
    ImgBigShow,
  },
});
</script>

<style></style>
