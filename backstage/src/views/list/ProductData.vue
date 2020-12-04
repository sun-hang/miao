<template>
  <div class="product-data-box" v-if="tableData">
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
        prop="text"
        label="产品参数名"
        header-row-class-name="thstyle"
      >
        <template slot-scope="scope">
          <TableTdComponent
            type="text"
            :text="scope.row.text"
            :key="scope.row.id"
            @change="
              (item) => {
                scope.row.text = item;
              }
            "
          ></TableTdComponent>
        </template>
      </el-table-column>
      <el-table-column
        prop="price"
        label="产品价格"
        header-row-class-name="thstyle"
      >
        <template slot-scope="scope">
          <TableTdComponent
            :key="scope.row.id"
            type="number"
            :text="scope.row.price"
            @change="
              (item) => {
                scope.row.price = item;
              }
            "
          ></TableTdComponent>
        </template>
      </el-table-column>
      <el-table-column
        prop="bidImgSrc"
        label="展示大图"
        header-row-class-name="thstyle"
      >
        <template slot-scope="scope">
          <table-td-file-upload-component
            :text="scope.row.bidImgSrc"
            @change="
              (item) => {
                scope.row.bidImgSrc = item;
              }
            "
          ></table-td-file-upload-component>
        </template>
      </el-table-column>
      <el-table-column
        prop="smallImgSrc"
        label="展示小图"
        header-row-class-name="thstyle"
      >
        <template slot-scope="scope">
          <table-td-file-upload-component
            :text="scope.row.smallImgSrc"
            @change="
              (item) => {
                scope.row.smallImgSrc = item;
              }
            "
          ></table-td-file-upload-component>
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
  props: ['id'],
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
          return item.title.includes(this.searchStr);
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
        "/api/productdata/" + item.id,
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
        "/api/productdata/" + +item.id,
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
    },
  },
  mounted() {
    fetch("/api/productdata/product/" + this.id, {
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

<style>
.el-table th.is-leaf {
  background: #ccc;
  /* text-align: center; */
}
</style>
