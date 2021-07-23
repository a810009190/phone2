<template>
  <div>
    <div class="container">
      <div class="panel">
        <div class="header">
          <h2>
            {{name}}修改页
            <span class="return" @click="back()">返回</span>
          </h2>
        </div>
        <!-- <div class="navBar">
          <ul class="headMenu">
            <li
              @click="changeTask(item)"
            >{{item | toDisplay}}</li>
          </ul>
        </div>-->
        <form>
          <select @change="changeTask($event)">
            <option
              v-for="(item,index) in ctaskList"
              :key="index"
              :value="item"
            >{{item | toDisplay}}</option>
          </select>
          <Button class="button" type="button" style="width:99%" @click="refresh()">修改该任务情况</Button>
        </form>

        <aside>
          <ul>
            <li
              v-for="(item,index) in taskList"
              :key="index"
              @click="changeIndex(index)"
              :class="{'active': currentSort == index}"
            >{{item}}</li>
          </ul>
        </aside>
        <table>
          <tr>
            <th>提取项目</th>
            <th>原先提取情况</th>
            <th>修改成</th>
            <th>原先提取版本</th>
            <th>修改成</th>
            <th>修改</th>
          </tr>
        </table>
        <div class="fb">
          <table>
            <tbody>
              <tr v-for="(item,index) in currentList" :key="index">
                <td>{{item.displayName}}</td>
                <td :class="delCss(item.isSuccess)">{{item.isSuccess | toChinese}}</td>
                <td>
                  <select @change="clearSelect(index)" v-model="seVal[index]">
                    <!-- 利用v-model绑定数组 切换时或提交时清空-->
                    <option
                      v-for="(option,index) in options"
                      :key="index"
                      :value="option.value"
                    >{{option.text}}</option>
                  </select>
                </td>
                <td>{{item.recordVersion}}</td>
                <td>
                  <input type="text" @change="clearInput(index)" v-model="inputVal[index]">
                </td>
                <td>
                  <button class="nbutton" type="button" @click="modiData(item.id)">修改该项</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modify",
  data() {
    return {
      changeColor: "normal",
      seVal: [],
      inputVal: [],
      inputValue: "",
      selectValue: 0,
      currentSort: 0,
      name: "",
      alldata: {},
      getdata: {},
      trIndex: 0,
      currentList: [],
      ctaskList: [],
      selected: 0,
      options: [
        { text: "失败", value: 0 },
        { text: "成功", value: 1 },
        { text: "未知", value: 2 }
      ],
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
        huaweiList: [
          "androidIntelligent",
          "androidhuaweiclone",
          "androidhuaweiexchange"
        ],
        vivoList: ["androidIntelligent", "androidvivoexchange"],
        xiaomiList: ["androidIntelligent", "androidxiaomiexchange"],
        oppoList: ["androidIntelligent", "androidoppoexchange"],
        googleList: ["androidIntelligent"],
        nokiaList: ["androidIntelligent"],
        meizuList: ["androidIntelligent"],
        samsungList: ["androidIntelligent", "androidsamsungexchange"]
      },
      basicList: [],
      broswerList: [],
      imList: [],
      intlimList: [],
      mailList: [],
      clouddistList: [],
      videoList: [],
      workerList: [],
      geoList: [],
      ecommerceList: [],
      toolsList: [],
      taskId: "a"
    };
  },
  mounted() {
    this.name = this.$route.query.model;
    this.ctaskList = this.brandTask[this.$route.query.brandName];
    // console.log(this.ctaskList);
    this.$axios
      // .get("/data/huawei/" + this.$route.params.id + ".json")
      .get("http://172.16.10.124:3000/r" + this.$route.params.id + this.taskId)
      .then(res => {
        this.alldata = res.data;
        this.dataScreen(this.alldata);
        // console.log(this.intlimList);
        this.currentList = this.basicList;
      });
  },
  methods: {
    // 根据索引展示指定项
    changeIndex(index) {
      this.currentSort = index;
      if (index == 0) {
        this.currentList = this.basicList;
        // console.log(this.currentList);
      } else if (index == 1) {
        this.currentList = this.broswerList;
      } else if (index == 2) {
        this.currentList = this.imList;
      } else if (index == 3) {
        this.currentList = this.intlimList;
      } else if (index == 4) {
        this.currentList = this.mailList;
      } else if (index == 5) {
        this.currentList = this.clouddistList;
      } else if (index == 6) {
        this.currentList = this.videoList;
      } else if (index == 7) {
        this.currentList = this.workerList;
      } else if (index == 8) {
        this.currentList = this.geoList;
      } else if (index == 9) {
        this.currentList = this.ecommerceList;
      } else {
        this.currentList = this.toolsList;
      }
      this.seVal = [];
      this.inputVal = [];
    },
    // 清空选项，拿到选项
    clearSelect(index) {
      this.selectValue = this.seVal[index];
      // console.log(this.selectValue);
      console.log(this.seVal[index]);
    },
    // 清空输入框，拿到输入框内容
    clearInput(index) {
      this.inputValue = this.inputVal[index];
    },
    modiData(id) {
      if (this.selectValue === "") {
        this.$message({
          message: "空着干嘛",
          type: "error"
        });
        return;
      }
      if (!this.inputValue) {
        this.inputValue = "V3.10.1";
      }

      let data = {
        taskId: id,
        phoneId: this.$route.params.id + this.taskId,
        isSuccess: this.selectValue,
        Vendor_version: this.inputValue
      };
      this.$axios.post("http://172.16.10.124:3000/modify", data);

      let newArr = this.currentList;
      let item;
      newArr.forEach(item => {
        if (item.id == id) {
          item.isSuccess = this.selectValue;
          item.recordVersion = this.inputValue;
        }
      });

      this.currentList = newArr;
      this.seVal = [];
      this.inputVal = [];
      this.inputValue = "";
      this.selectValue = "";
      this.$message({
        message: "修改成功",
        type: "success"
      });
    },
    // 根据所选任务改变任务项
    changeTask(e) {
      let val = e.target.value;
      // console.log(val);
      if (val == "androidIntelligent") {
        this.taskId = "a";
      } else if (val == "androidhuaweiclone") {
        this.taskId = "b";
      } else {
        this.taskId = "c";
      }
      // console.log(this.taskId);
    },
    // 切换任务
    refresh() {
      this.$axios
        .get(
          "http://172.16.10.124:3000/r" + this.$route.params.id + this.taskId
        )
        .then(res => {
          this.alldata = res.data;
          this.dataScreen(this.alldata);
          this.currentList = this.basicList;
        });
      this.$message({
        message: "切换成功",
        type: "success"
      });
    },
    dataScreen(data) {
      this.basicList = data.filter(item => item.class == "basic");
      this.broswerList = data.filter(item => item.class == "broswer");
      this.imList = data.filter(item => item.class == "im");
      this.intlimList = data.filter(item => item.class == "intlim");
      this.mailList = data.filter(item => item.class == "mail");
      this.clouddistList = data.filter(item => item.class == "clouddist");
      this.videoList = data.filter(item => item.class == "video");
      this.workerList = data.filter(item => item.class == "worker");
      this.geoList = data.filter(item => item.class == "geo");
      this.ecommerceList = data.filter(item => item.class == "ecommerce");
      this.toolsList = data.filter(item => item.class == "tools");
    },
    back() {
      this.$router.go(-1);
    },
    delCss(val){
      let css = val == 0 ? 'fail' : (val == 1 ? 'success' : 'normal');
      return css;
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

<style scoped>
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
aside {
  text-align: center;
  width: 100%;
}
aside ul {
  list-style: none;
  margin: 2px 40px;
}

aside ul li {
  width: 100px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  float: left;
}
aside ul li:hover {
  background-color: #eeeeee;
}
#box {
  display: flex;
}
.active {
  background-color: #eeeeee;
  border-radius: 2px;
}
.fb {
  max-height: 633px;
  overflow: auto;
  width: 100%;
}
h2 {
  position: relative;
}
.return {
  position: absolute;
  right: 0;
}
select {
  width: auto;
  padding: 0 30% !important;
  text-align: center;
}
input {
  height: 24px;
}
table td,
table th {
  padding: 0 !important;
  border: 1px solid #e6eaec;
  color: #666;
  line-height: 40px;
  width: 215.5px !important;
  height: 68px !important;
}
.success{
  color: #33cc33;
}
.fail{
  color: red;
}
.normal{
  color: #666666
}
</style>