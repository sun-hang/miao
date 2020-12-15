<template>
  <div>
    <el-button
      type="primary"
      size="mini"
      style="margin: 0 10px 0 0"
      @click="showProductData"
      >查看产品参数</el-button
    >
    <el-dialog
      :title="item.productName + '参数列表'"
      :visible.sync="dialogFormVisible"
    >
      <ProductDataView :id="id"></ProductDataView>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ProductDataView from "../../../views/list/ProductData.vue";
export default Vue.extend({
  props: ["id",'item'],
  data() {
    return {
      dialogFormVisible: false,
    };
  },
  components: {
    ProductDataView,
  },
  methods: {
      showProductData(){
          this.dialogFormVisible = true
      }
  },
});
</script>

<style></style>
