<template>
  <header>
    <el-row class="tac">
      <el-col :span="30">
        <h1>导航</h1>
        <el-menu default-active="activeIndex">
          <router-link tag="span" to="/report">
            <el-menu-item index="1">
              <template>自助生成测试报告</template>
            </el-menu-item>
          </router-link>
          <router-link tag="span" to="/phone">
            <el-menu-item index="2">
              <template>手机支持情况查询</template>
            </el-menu-item>
          </router-link>
          <router-link tag="span" to="/sendMessenge">
            <el-menu-item index="3">
              <template>自助微信登录</template>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
  name: "Header",
  data(){
    return{
      activeIndex: 2
    }
  }
};
</script>

<style>
.el-row {
  float: left !important;
}
h1{
    text-align: center;
}
.tac{
    position: fixed;
    top: 200px;
}
</style>
