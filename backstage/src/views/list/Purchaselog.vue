<template>
  <div class="purchaselog-box" v-if="tableData">
    <SearchInputComponent @click="searchClick"></SearchInputComponent>
    <el-table
      style="width: 100%"
      ref="bigadTable"
      :data="tableData"
      border
      show-header
      v-if="tableData"
    >
      <el-table-column label="姓名" header-row-class-name="thstyle">
        <template slot-scope="scope">
          <span>{{ scope.row.useradmin.loginUser }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品名称" header-row-class-name="thstyle">
        <template slot-scope="scope">
          <span>{{ scope.row.product.productName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品参数" header-row-class-name="thstyle">
        <template slot-scope="scope">
          <span>{{ scope.row.productdatum.text }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品单价" header-row-class-name="thstyle">
        <template slot-scope="scope">
          <span>{{ scope.row.productdatum.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="购买数量" header-row-class-name="thstyle">
        <template slot-scope="scope">
          <span>{{ scope.row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" header-row-class-name="thstyle">
        <template slot-scope="scope">
          <span>{{ scope.row.remarks }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      style="margin: 20px auto"
      :page-size="5"
      layout="prev, pager, next"
      :total="searchData.length"
      @current-change="currentPageChange"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SearchInputComponent from "../../components/list/SearchInputComponent.vue";
import DelButtonComponent from "../../components/list/DelButtonComponent.vue";
import TableTdFileUploadComponent from "../../components/list/TableTdFileUploadComponent.vue";
import TableTdComponent from "../../components/list/TableTdComponent.vue";
import { upload } from "../utli";
export default Vue.extend({
  data() {
    return {
      data: [],
      page: 1,
      searchData: [],
      searchStr: "",
    };
  },
  computed: {
    tableData() {
      let data: never[] = [];
      if (this.searchStr) {
        this.searchData = this.data.filter((item: any) => {
          return item.useradmin.loginUser.includes(this.searchStr) || item.product.productName.includes(this.searchStr);
        });
      } else {
        this.searchData = this.data;
      }
      if (this.searchData.length < 5) {
        data = this.searchData;
        return data;
      }
      data = this.searchData.slice((this.page - 1) * 5, this.page * 5);
      return data;
    },
  },
  methods: {
    currentPageChange(page: number) {
      this.page = page;
    },
    searchClick(option: string) {
      this.searchStr = option;
    },
  },
  mounted() {
    fetch("/api/purchaselog", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        this.data = res.data;
      });
  },
  components: {
    TableTdComponent,
    TableTdFileUploadComponent,
    DelButtonComponent,
    SearchInputComponent,
  },
});
</script>

<style></style>
