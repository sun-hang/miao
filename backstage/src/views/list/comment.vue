<template>
  <div class="bigadlist-box">
    <SearchInputComponent @click="searchClick"></SearchInputComponent>
    <el-table
      style="width: 100%"
      ref="bigadTable"
      :data="tableData"
      border
      show-header
      v-if="tableData"
    >
      <el-table-column label="用户名" header-row-class-name="thstyle">
        <template slot-scope="scope">
          <span>{{ scope.row.useradmin.loginUser }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="content"
        label="评论内容"
        header-row-class-name="thstyle"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品名称" header-row-class-name="thstyle">
        <template slot-scope="scope">
          <span>{{ scope.row.product.productName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="imgs"
        label="评论图片"
        header-row-class-name="thstyle"
      >
        <template slot-scope="scope" v-if="scope.row.imgs">
          <table-td-file-upload-component
            :text="scope.row.imgs"
            @change="
              (item) => {
                scope.row.imgs = item;
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
            >回复</el-button
          >
          <el-dialog title="回复" :visible.sync="dialogFormVisible">
            <el-row>
              <el-col :span="4">回复内容：</el-col>
              <el-col :span="20"><el-input v-model="inpStr" type="textarea" :autosize="{ minRows: 4 }"></el-input></el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false"
                >确 定</el-button
              >
            </div>
          </el-dialog>
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
    {{searchData}}
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
  mounted() {
    fetch("/api/bigad", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        this.data = res.data;
      });
  },
  data() {
    return {
      data: [],
      page: 1,
      searchData: [],
      searchStr: "",
      dialogFormVisible:false,
      inpStr:""
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
      this.searchData = newData;
      let total = Math.ceil(this.searchData.length / 5);
      if (this.page > total) {
        this.page = total;
      }
      upload(
        "/api/bigad/" + item.id,
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
        "/api/bigad/" + +item.id,
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
});
</script>

<style></style>
