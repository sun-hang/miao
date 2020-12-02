<template>
  <div class="newslist-box">
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
        prop="title"
        label="新闻标题"
        header-row-class-name="thstyle"
      >
        <template slot-scope="scope" v-if="scope.row.title">
          <TableTdComponent
            type="text"
            :text="scope.row.title"
            :key="scope.row.title"
            @change="
              (item) => {
                scope.row.title = item;
              }
            "
          ></TableTdComponent>
        </template>
      </el-table-column>
      <el-table-column
        prop="synopsis"
        label="新闻简介"
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
        prop="content"
        label="新闻内容"
        header-row-class-name="thstyle"
      >
        <template slot-scope="scope">
          <TableTdComponent
            :key="scope.row.id"
            type="text"
            :text="scope.row.content"
            @change="
              (item) => {
                scope.row.content = item;
              }
            "
          ></TableTdComponent>
        </template>
      </el-table-column>
      <el-table-column
        prop="imgsrc"
        label="新闻大图"
        header-row-class-name="thstyle"
      >
        <template slot-scope="scope">
          <table-td-file-upload-component
            :text="scope.row.imgsrc"
            @change="
              (item) => {
                scope.row.imgsrc = item;
              }
            "
          ></table-td-file-upload-component>
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
        prop="ctime"
        label="创建时间"
        header-row-class-name="thstyle"
      >
        <template slot-scope="scope">
          <TableTdDateComponent :item="scope.row.ctime"></TableTdDateComponent>
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
import { upload, errorAlert } from "../utli";
import TableTdDateComponent from "../../components/list/TableTdDateComponent.vue";
import TableTdTagComponent from "../../components/list/TableTdTagComponent.vue";
import DelButtonComponent from "../../components/list/DelButtonComponent.vue";
import SearchInputComponent from "../../components/list/SearchInputComponent.vue";
import TableTdComponent from "../../components/list/TableTdComponent.vue";
import TableTdFileUploadComponent from "../../components/list/TableTdFileUploadComponent.vue";
export default Vue.extend({
  components: {
    DelButtonComponent,
    SearchInputComponent,
    TableTdComponent,
    TableTdFileUploadComponent,
    TableTdTagComponent,
    TableTdDateComponent,
  },
  computed: {
    tableData() {
      let data: never[] = [];
      if (this.searchStr) {
        this.searchData = this.data.filter((item: any) => {
          return item.title.includes(this.searchStr) || item.synopsis.includes(this.searchStr);
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
  data() {
    return {
      data: [],
      searchData: [],
      page: 1,
      searchStr: "",
    };
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
        "/api/news/" + item.id,
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
        "/api/news/" + +item.id,
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
    fetch("/api/news", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        this.data = res.data;
      });
  },
});
</script>

<style>
.el-table th.is-leaf {
  background: #ccc;
  /* text-align: center; */
}
</style>
