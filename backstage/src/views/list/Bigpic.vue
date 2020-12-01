<template>
  <div class="bigpic-box">
    <el-table
      style="width: 100%"
      ref="bigadTable"
      :data="tableData"
      border
      show-header
      v-if="tableData"
    >
      <el-table-column
        prop="content"
        label="首页大图"
        header-row-class-name="thstyle"
      >
        <template slot-scope="scope">
          <table-td-file-upload-component
            :text="scope.row.imgsrc"
            :key="scope.row.id"
            @change="
              (item) => {
                scope.row.imgsrc = item;
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
      :total="data.length"
      @current-change="currentPageChange"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { upload, errorAlert } from "../utli";
import TableTdFileUploadComponent from "../../components/list/TableTdFileUploadComponent.vue";
import DelButtonComponent from "../../components/list/DelButtonComponent.vue";
export default Vue.extend({
  data() {
    return {
      data: [],
      page: 1,
    };
  },
  computed: {
    tableData() {
      let data: never[] = [];
      if (this.data.length < 5) {
        data = this.data;
        return data;
      }
      data = this.data.slice((this.page - 1) * 5, this.page * 5);
      return data;
    },
  },
  mounted() {
    fetch("/api/bigpic", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        this.data = res.data;
      });
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
        "/api/bigpic/" + item.id,
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
        "/api/bigpic/" + item.id,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
        () => {},
        this
      );
    },
  },
  components: {
    DelButtonComponent,
    TableTdFileUploadComponent,
  },
});
</script>

<style></style>
