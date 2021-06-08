<template>
  <el-container>
    <el-header height="45px">
      <h2>{{name}}详情页</h2>
    </el-header>
    <el-container>
      <el-aside width="150px">
        <el-row>
          <el-menu>
            <el-menu-item
              v-for="(item,index) in taskList"
              :key="index"
              @click="changeIndex(index)"
            >{{item}}</el-menu-item>
          </el-menu>
        </el-row>
      </el-aside>
      <el-main>
        <div class="navBar">
          <ul class="headMenu">
            <li v-for="(item,index) in ctaskList" :key="index">
              {{item}}
            </li>
          </ul>
        </div>
        <el-table
          :data="currentList"
          border
          style="width: 50%"
          :header-cell-style="{textAlign: 'center'}"
          :cell-style="{textAlign: 'center'}"
        >
          <el-table-column prop="displayName" label="提取项目" width="427.5"></el-table-column>
          <el-table-column prop="isSuccess" label="提取情况" width="427.5">
            <template slot-scope="scope">{{scope.row.isSuccess | toChinese}}</template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <!-- <el-footer height="30px">&copy;wy 2021</el-footer> -->
  </el-container>
</template>

<script>
export default {
  name: "detail",
  data() {
    return {
      name:"",
      getdata:{},
      trIndex: 0,
      currentList: [],
      ctaskList: [],
      taskList: [
        "基本信息",
        "浏览器",
        "即时通讯",
        "境外通讯",
        "邮箱工具",
        "网络云盘",
        "视频音频",
        "办公软件",
        "位置出行",
        "网络购物",
        "其他工具"
      ],
      brandTask: {
        huawei: ["androidIntelligent", "androidhuaweiclone", "androidhuaweiexchange", "androidselfbackup", "androidextra"],
        vivo: ["androidIntelligent", "androidvivoexchange", "androidextra"],
        xiaomi: ["androidIntelligent", "androidxiaomiexchange", "androidselfbackup", "androidextra"],
        oppo: ["androidIntelligent", "androidoppoexchange", "androidselfbackup", "androidextra"],
        google: ["androidIntelligent", "androidextra"],
        nokia: ["androidIntelligent", "androidextra"],
        meizu: ["androidIntelligent", "androidselfbackup", "androidextra"],
        samsung: ["androidIntelligent", "androidsamsungexchange", "androidextra"]
      }
    };
  },
  mounted() {
    console.log(this.$route.params.id);
    console.log(this.$route.query.model);
    this.name = this.$route.query.model
    this.ctaskList=this.brandTask[this.$route.query.brandName];
    console.log(this.ctaskList);
    // this.$http.get('static/huawei/1101.json').then(res => {
    //   console.log("json数据为:" + res)
    // })
    // this.$jsonp('1101.json').then((res)=>{
    //   console.log(res.data)
    // })
    this.$axios.get('/data/huawei/'+this.$route.params.id+'.json').then((res)=>{
      this.getdata = res.data.androidIntelligent;
    })
  },
  methods: {
    changeIndex(index) {
      if (index == 0) {
        this.currentList = this.getdata.basicList;
        console.log(this.currentList);
      } else if (index == 1) {
        this.currentList = this.getdata.broswerList;
      }
    }
  },
  filters: {
    toChinese(msg) {
      if (msg == true) {
        return "成功";
      } else if (msg == false) {
        return "失败";
      } else{
        return "未知";
      }
    }
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
.el-menu-item {
  margin: 10px 0 10px 0;
  border: 1px solid black;
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

.el-table {
  margin-top: 40px !important;
  margin: auto;
}
.headMenu {
  width: 100%;
  text-align: center;
  height: 50px;
  display: flex;
}
.headMenu li {
  float: left;
  margin: 10px;
  list-style-type: none;
  flex: 1;
  height: 40px;
  border: 1px solid black;
}
</style>