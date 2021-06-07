<template>
  <el-container>
    <el-header height="45px">
      <h2>手机详情页</h2>
    </el-header>
    <el-container>
      <el-aside width="150px">
        <el-row>
          <el-menu>
            <el-menu-item>123</el-menu-item>
            <el-menu-item>123</el-menu-item>
            <el-menu-item>123</el-menu-item>
            <el-menu-item>123</el-menu-item>
          </el-menu>
        </el-row>
      </el-aside>
      <el-main>
        <el-table
          :data="tableData"
          border
          style="width: 50%"
          :header-cell-style="{textAlign: 'center'}"
          :cell-style="{textAlign: 'center'}"
        >
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <el-footer height="30px">&copy;wy 2021</el-footer>
  </el-container>
</template>

<script>
export default {
  name: "detail",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  mounted() {
    console.log(this.$route.params.id);
  }
};
</script>

<style>
.el-header {
  background-color: #409eff;
  color: white;
  text-align: center;
}
.el-aside {
  margin-top: 10px;
}
.el-menu-item{
  margin: 10px 0 10px 0;
  border: 1px solid black
}
.el-col {
  height: 200px;
}
.el-footer {
  position: absolute;
  bottom: 16px;
  left: calc(48%);
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

.el-table{
  margin: auto;
}
</style>