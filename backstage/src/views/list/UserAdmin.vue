<template>
  <div class="useradmin-box" v-if="tableData">
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
        prop="loginUser"
        label="用户名"
        header-row-class-name="thstyle"
      >
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        header-row-class-name="thstyle"
      >
      </el-table-column>
      <el-table-column prop="sex" label="性别" header-row-class-name="thstyle">
        <template slot-scope="scope">
          {{ scope.row.sex == 1 ? "女" : "男" }}
        </template>
      </el-table-column>
      <el-table-column
        prop="useraddresses"
        label="地址"
        header-row-class-name="thstyle"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.useraddresses.length == 0">
            还没有设置地址
          </p>
          <p v-for="(item, index) in scope.row.useraddresses" :key="index">
            {{ item }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系方式"
        header-row-class-name="thstyle"
      >
      </el-table-column>
      <el-table-column
        width="160px"
        label="操作"
        header-row-class-name="thstyle"
      >
        <template slot-scope="scope">
          <ImgBigShow :src="scope.row.imgsrc"></ImgBigShow>
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
import ImgBigShow from "../../components/list/ImgBigShow.vue";
import SearchInputComponent from "../../components/list/SearchInputComponent.vue";
export default Vue.extend({
  data() {
    return {
      data: [],
      page: 1,
      searchData: [],
      searchStr: "",
    };
  },
  methods: {
    searchClick(str: string) {
      this.searchStr = str;
    },
    currentPageChange(page: number) {
      this.page = page;
    },
  },
  components: {
    SearchInputComponent,
    ImgBigShow,
  },
  mounted() {
    fetch("/api/user", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        this.data = res.data;
      });
  },
  computed: {
    tableData() {
      let data: never[] = [];
      if (this.searchStr) {
        this.searchData = this.data.filter((item: any) => {
          return item.loginUser.includes(this.searchStr);
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
});
</script>

<style>
.el-table th.is-leaf {
  background: #ccc;
  /* text-align: center; */
}
</style>
