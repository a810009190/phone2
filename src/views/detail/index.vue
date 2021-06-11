<template>
  <el-container>
    <div class="panel">
      <div class="header">
        <h2>{{name}}详情页</h2>
      </div>
    </div>
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
        <div class="navBar">
          <ul class="headMenu">
            <li
              v-for="(item,index) in ctaskList"
              :key="index"
              @click="changeTask(item)"
            >{{item | toDisplay}}</li>
          </ul>
        </div>
        <table class="tbe">
          <tr>
            <th>提取项目</th>
            <th>提取情况</th>
          </tr>
          <tr v-for="(item,index) in currentList" :key="index">
            <td>
              {{item.displayName}}
            </td>
            <td>
              {{item.isSuccess | toChinese}}
            </td>
          </tr>
        </table>

    <!-- <el-footer height="30px">&copy;wy 2021</el-footer> -->
  </el-container>
</template>

<script>
export default {
  name: "detail",
  data() {
    return {
      name: "",
      alldata: {},
      getdata: {},
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
        huawei: [
          "androidIntelligent",
          "androidhuaweiclone",
          "androidhuaweiexchange",
          "androidselfbackup",
          "androidextra"
        ],
        vivo: ["androidIntelligent", "androidvivoexchange", "androidextra"],
        xiaomi: [
          "androidIntelligent",
          "androidxiaomiexchange",
          "androidselfbackup",
          "androidextra"
        ],
        oppo: [
          "androidIntelligent",
          "androidoppoexchange",
          "androidselfbackup",
          "androidextra"
        ],
        google: ["androidIntelligent", "androidextra"],
        nokia: ["androidIntelligent", "androidextra"],
        meizu: ["androidIntelligent", "androidselfbackup", "androidextra"],
        samsung: [
          "androidIntelligent",
          "androidsamsungexchange",
          "androidextra"
        ]
      }
    };
  },
  mounted() {
    this.name = this.$route.query.model;
    this.ctaskList = this.brandTask[this.$route.query.brandName];
    this.$axios
      .get("/data/huawei/" + this.$route.params.id + ".json")
      .then(res => {
        this.getdata = res.data.androidIntelligent;
        this.alldata = res.data;
        this.currentList = this.getdata.basicList;
      });
  },
  methods: {
    // 根据索引展示指定项
    changeIndex(index) {
      if (index == 0) {
        this.currentList = this.getdata.basicList;
        console.log(this.currentList);
      } else if (index == 1) {
        this.currentList = this.getdata.broswerList;
      } else if (index == 2) {
        this.currentList = this.getdata.imList;
      } else if (index == 3) {
        this.currentList = this.getdata.intlimList;
      } else if (index == 4) {
        this.currentList = this.getdata.mailList;
      } else if (index == 5) {
        this.currentList = this.getdata.clouddistList;
      } else if (index == 6) {
        this.currentList = this.getdata.videoList;
      } else if (index == 7) {
        this.currentList = this.getdata.workerList;
      } else if (index == 8) {
        this.currentList = this.getdata.geoList;
      } else if (index == 9) {
        this.currentList = this.getdata.ecommerceList;
      } else {
        this.currentList = this.getdata.toolsList;
      }
    },
    // 根据所选任务改变任务项
    changeTask(item) {
      this.getdata = this.alldata[item];
    }
  },
  filters: {
    // 提取情况过滤为中文
    toChinese(msg) {
      if (msg == true) {
        return "成功";
      } else if (msg == false) {
        return "失败";
      } else {
        return "未知";
      }
    },
    // 任务名字过滤为中文
    toDisplay(msg) {
      if (msg == "androidIntelligent") {
        return "智能提取";
      } else if (msg == "androidhuaweiclone") {
        return "华为克隆";
      } else if (msg == "androidhuaweiexchange") {
        return "华为高级备份";
      } else if (msg == "androidselfbackup") {
        return "自带备份";
      } else if (msg == "androidextra") {
        return "数据提取";
      } else if (msg == "androidvivoexchange") {
        return "VIVO互传";
      } else if (msg == "androidxiaomiexchange") {
        return "小米高级备份";
      } else if (msg == "androidoppoexchange") {
        return "OPPO高级备份";
      } else if (msg == "androidsamsungexchange") {
        return "三星高级备份";
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
  height: 45px;
  width: 80%;
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
  max-height: 600px;
  overflow: auto !important;
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