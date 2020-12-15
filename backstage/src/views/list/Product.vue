<template>
  <div class="product-box" v-if="tableData">
    <SearchInputComponent @click="searchClick"></SearchInputComponent>
    <el-table
      style="width: 100%"
      ref="bigadTable"
      :data="tableData"
      border
      show-header
      v-if="tableData"
    >
      <el-table-column
        prop="productName"
        label="产品名称"
        header-row-class-name="thstyle"
      >
        <template slot-scope="scope" v-if="scope.row.productName">
          <TableTdComponent
            type="text"
            :text="scope.row.productName"
            :key="scope.row.productName"
            @change="
              (item) => {
                scope.row.productName = item;
              }
            "
          ></TableTdComponent>
        </template>
      </el-table-column>
      <el-table-column
        prop="originalPrice"
        label="产品原价"
        header-row-class-name="thstyle"
      >
        <template slot-scope="scope">
          <TableTdComponent
            :key="scope.row.id"
            type="number"
            :text="scope.row.originalPrice"
            @change="
              (item) => {
                scope.row.originalPrice = item;
              }
            "
          ></TableTdComponent>
        </template>
      </el-table-column>
      <el-table-column
        prop="nowPrice"
        label="产品现价"
        header-row-class-name="thstyle"
      >
        <template slot-scope="scope">
          <TableTdComponent
            :key="scope.row.id"
            type="number"
            :text="scope.row.nowPrice"
            @change="
              (item) => {
                scope.row.nowPrice = item;
              }
            "
          ></TableTdComponent>
        </template>
      </el-table-column>
      <el-table-column
        prop="imgsrc"
        label="产品展示图"
        header-row-class-name="thstyle"
      >
        <template slot-scope="scope">
          <table-td-file-upload-component
            :text="scope.row.listImgSrc"
            @change="
              (item) => {
                scope.row.listImgSrc = item;
              }
            "
          ></table-td-file-upload-component>
        </template>
      </el-table-column>
      <el-table-column
        prop="imgsrc"
        label="产品列表图"
        header-row-class-name="thstyle"
      >
        <template slot-scope="scope">
          <table-td-file-upload-component
            :text="scope.row.adImgSrc"
            @change="
              (item) => {
                scope.row.adImgSrc = item;
              }
            "
          ></table-td-file-upload-component>
        </template>
      </el-table-column>

      <el-table-column
        prop="synopsis"
        label="产品介绍"
        header-row-class-name="thstyle"
      >
        <template slot-scope="scope">
          <TableTdComponent
            :key="scope.row.id"
            type="text"
            :text="scope.row.synopsis"
            @change="
              (item) => {
                scope.row.synopsis = item;
              }
            "
          ></TableTdComponent>
        </template>
      </el-table-column>

      <el-table-column
        prop="synopsisImgSrc"
        label="产品详情图"
        header-row-class-name="thstyle"
      >
        <template slot-scope="scope">
          <table-td-file-upload-component
            :text="scope.row.synopsisImgSrc"
            @change="
              (item) => {
                scope.row.synopsisImgSrc = item;
              }
            "
          ></table-td-file-upload-component>
        </template>
      </el-table-column>

      <el-table-column
        prop="detail"
        label="产品介绍"
        header-row-class-name="thstyle"
      >
        <template slot-scope="scope">
          <TableTdComponent
            :key="scope.row.id"
            type="text"
            :text="scope.row.detail"
            @change="
              (item) => {
                scope.row.detail = item;
              }
            "
          ></TableTdComponent>
        </template>
      </el-table-column>

      <el-table-column
        prop="tag"
        label="新闻标签"
        header-row-class-name="thstyle"
      >
        <template slot-scope="scope">
          <TableTdTagComponent
            :tag="scope.row.tag"
            @click="
              (item) => {
                scope.row.tag = item;
              }
            "
          ></TableTdTagComponent>
        </template>
      </el-table-column>

      <el-table-column
        width="160px"
        label="操作"
        header-row-class-name="thstyle"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            style="margin: 0 10px 0 0"
            @click="updata(scope.row)"
            >修改</el-button
          >
          <DelButtonComponent :item="scope.row" @change="yesDel" />
         <ProductDataConnect :id="scope.row.id" :item="scope.row"/>
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
import ProductDataConnect from "../../components/list/productDataConnect/productDataConnect.vue";
import ProductDataView from "./ProductData.vue";
import TableTdTagComponent from "../../components/list/TableTdTagComponent.vue";
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
      dialogFormVisible: false,
    };
  },
  computed: {
    tableData() {
      let data: never[] = [];
      if (this.searchStr) {
        this.searchData = this.data.filter((item: any) => {
          return (
            item.productName.includes(this.searchStr) ||
            item.synopsis.includes(this.searchStr)
          );
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
    yesDel(item: any) {
      let newData = this.data.filter((it: any) => {
        return it.id !== item.id;
      });
      this.data = newData;
      let total = Math.ceil(this.data.length / 5);
      if (this.page > total) {
        this.page = total;
      }
      upload(
        "/api/product/" + item.id,
        {
          credentials: "include",
          method: "delete",
        },
        () => {},
        this
      );
    },
    updata(item: any) {
      let data = {
        ...item,
      };
      delete data.id;
      delete data.deletedAt;
      upload(
        "/api/product/" + +item.id,
        {
          credentials: "include",
          body: JSON.stringify(data),
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
        },
        () => {},
        this
      );
    },
    searchClick(option: string) {
      this.searchStr = option;
    }
  },
  mounted() {
    fetch("/api/product", {
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
    TableTdTagComponent,
    ProductDataView,
    ProductDataConnect,
  },
});
</script>

<style>
.el-table th.is-leaf {
  background: #ccc;
  /* text-align: center; */
}
</style>
