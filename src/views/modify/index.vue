<template>
  <div>
    <div class="container">
      <div class="panel">
        <div class="header">
          <h3>
            <span class="set" @click="setVersion()">设置</span>
            {{name}}修改页
            <span class="return" @click="back()">返回</span>
          </h3>
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
            <option v-for="(item,index) in ctaskList" :key="index" :value="item">{{item | toDisplay}}</option>
          </select>
          <Button class="button" type="button" style="width:99%" @click="refresh()">修改该任务情况</Button>
        </form>
        <aside>
          <ul>
            <li v-for="(item,index) in taskList" :key="index" @click="changeIndex(index)" :class="{'active': currentSort == index}">{{item}}</li>
          </ul>
        </aside>

        <el-table :data="currentList.filter(data => !search || data.displayName.toLowerCase().includes(search.toLowerCase()))" max-height="730px" border style="width: 100%" :default-sort="{prop: 'displayName',order:'descending'}">
          <!-- <el-table-column v-for='(item,index) in tableList' :key=index
            :label="item"
            min-width="10%"
            align=center
            >
          </el-table-column> -->
          <el-table-column prop="displayName" label="提取项目" min-width="12%" align="center" sortable>
          </el-table-column>
          <el-table-column prop="isSuccess" label="原先提取情况" min-width="13%" align="center" sortable>
            <template slot-scope="scope"><span :class="delCss(scope.row.isSuccess)">{{scope.row.isSuccess | toChinese}}</span></template>
          </el-table-column>
          <el-table-column prop="address" label="修改成" min-width="13%" align="center">
            <template slot-scope="scope">
              <!-- 使用scope.$index来获取当前索引值 -->
              <select @change="getSelect(scope.$index)" v-model="seVal[scope.$index]">
                <!-- 利用v-model绑定数组 切换时或提交时清空-->
                <option v-for="(option,index) in options" :key="index" :value="option.value">{{option.text}}</option>
              </select>
            </template>
          </el-table-column>
          <el-table-column prop="recordVersion" label="原先提取版本" min-width="12%" align="center">
          </el-table-column>
          <el-table-column prop="address" label="修改成" min-width="12%" align="center">
              <template slot-scope="scope">
                  <el-input @change="getInput(scope.$index)" v-model="inputVal[scope.$index]" />
                </template>
          </el-table-column>
          <el-table-column label="备注" min-width="12%" align="center">
            <template slot-scope="scope">
              <el-input @change="getInput1(scope.$index)" v-model="inputVal1[scope.$index]"/>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="15%">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" placeholder="输入关键字搜索" />
            </template>
            <template slot-scope="scope">
              <button class="nbutton" type="button" @click="modiData(scope.row.id)">修改该项</button>
            </template>
          </el-table-column>
        </el-table>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "modify",
    data() {
      return {
        url: this.Common.g_url,
        defaultVersion: "",
        changeColor: "normal",
        seVal: [],
        inputVal: [],
        inputVal1:[],
        inputValue: "",
        inputValue1: "",
        selectValue: 0,
        currentSort: 0,
        name: "",
        alldata: {},
        getdata: {},
        trIndex: 0,
        currentList: [],
        ctaskList: [],
        selected: 0,
        tableData: [],
        search: "",
        options: [
          { text: "失败", value: 0 },
          { text: "成功", value: 1 },
          { text: "未知", value: 2 }
        ],
        taskList: [
          "基本信息", "浏览器", "即时通讯", "境外通讯", "邮箱工具", "网络云盘", "视频音频", "办公软件", "位置出行", "网络购物", "其他工具"
        ],
        tableList: ["提取项目", "原先提取情况", "修改成", "原先提取版本", "修改成", "备注", "修改"],
        brandTask: {
          huaweiList: [
            "androidIntelligent",
            "androidhuaweiclone",
            "androidhuaweiexchange"
          ],
          vivoList: ["androidIntelligent", "androidvivoexchange"],
          xiaomiList: ["androidIntelligent", "androidxiaomiexchange", "xiaomimachinemerge"],
          oppoList: ["androidIntelligent", "androidoppoexchange", "androidoppoexchange2"],
          oneplusList: ["androidIntelligent", "androidoppoexchange"],
          otherList: ["androidIntelligent"],
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
      this.defaultVersion = this.$cookies.get("defaultVersion");
      console.log(this.defaultVersion);
      console.log(this.$route.query.brandName);
      console.log(this.ctaskList);
      this.$axios
        // .get("/data/huawei/" + this.$route.params.id + ".json")
        .get(this.url + "/r" + this.$route.params.id + this.taskId)
        .then(res => {
          this.alldata = res.data;
          this.dataScreen(this.alldata);
          // console.log(this.intlimList);
          this.currentList = this.basicList;
          console.log(this.currentList);
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
      // 拿到选项
      getSelect(index) {
        // console.log(this.selectValue);
        // console.log(this.seVal);
        this.selectValue = this.seVal[index];

      },
      // 拿到输入框内容
      getInput(index) {
        this.inputValue = this.inputVal[index];
      },
      getInput1(index) {
        this.inputValue1 = this.inputVal1[index];
      },
      modiData(id) {
        if (this.selectValue === "") {
          this.$message({
            message: "空着干嘛",
            type: "error"
          });
          return;
        }
        if (!this.defaultVersion && !this.inputValue) {
          this.inputValue = "V3.10.1";
        } else if (!this.inputValue) {
          this.inputValue = this.defaultVersion;
        }

        let data = {
          taskId: id,
          phoneId: this.$route.params.id + this.taskId,
          isSuccess: this.selectValue,
          Vendor_version: this.inputValue,
          remark: this.inputVal1
        };
        this.$axios.post(this.url + "/modify", data);

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
        this.inputVal1 = [];
        this.inputValue1 = "";
        this.selectValue = "";
        this.$message({
          message: "修改成功",
          type: "success"
        });
      },
      // 根据所选任务改变任务项
      changeTask(e) {
        let val = e.target.value;
        console.log(val);
        if (val == "androidIntelligent") {
          this.taskId = "a";
        } else if (val == "androidhuaweiclone" || val == "xiaomimachinemerge" || val == "androidoppoexchange2") {
          this.taskId = "b";
        } else {
          this.taskId = "c";
        }
        console.log(this.taskId);
      },
      // 排序方法，暂时未完成
      sortList(L, val) {
        return L.sort((a, b) => {
          let x = a.name.toLowerCase();
          let y = b.name.toLowerCase();
          if (x < y) { return -1; }
          if (x > y) { return 1; }
          return 0;
        });
      },
      // 切换任务
      refresh() {
        this.currentSort = 0;
        this.currentList = this.basicList;
        console.log("跳转路径" + this.url + "/r" + this.$route.params.id + this.taskId)
        this.$axios
          .get(
            this.url + "/r" + this.$route.params.id + this.taskId
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
      delCss(val) {
        let css = val == 0 ? 'fail' : (val == 1 ? 'success' : 'normal');
        return css;
      },
      setVersion() {
        this.$prompt('请设置当前统计默认的软件版本号', '设置', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',

        }).then(({ value }) => {
          this.defaultVersion = value;
          this.$cookies.set('defaultVersion', this.defaultVersion);
          console.log(this.defaultVersion);
          this.$message({
            type: 'success',
            message: '您设置的当前默认版本号为' + value

          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })


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
          return "手机搬家";
        } else if (msg == "androidsamsungexchange") {
          return "三星高级备份";
        } else if (msg == "xiaomimachinemerge") {
          return "小米换机";
        } else if (msg == "androidoppoexchange2") {
          return "OPPO直传";
        }
      }
    }
  };
</script>

<style scoped>
  /deep/.el-input__inner{
    height: 24px !important;
  }


  .el-table__body {
    height: 100%;
  }

  .el-table /deep/ th {
    padding: 20px;
    font-size: 16px;
    color: #666666;
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

  .nbutton,
  .el-button {
    display: inline-block;
    padding: 6px 15px;
    font-size: 12px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    outline: none;
    color: #fff;
    background-color: #337ab7;
    border: none;
    border-radius: 4px;
    margin: 2px;
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

  h3 {
    position: relative;
    padding-top: 20px !important;
  }

  .return {
    position: absolute;
    right: 0;
  }

  .set {
    position: absolute;
    left: 0;
  }

  select {
    width: auto;
    padding: 0 34% !important;
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

  .success {
    color: #33cc33;
  }

  .fail {
    color: red;
  }

  .normal {
    color: #666666
  }

  .button {
    margin: 5px;
    display: inline-block;
    padding: 5px;
    font-size: 14px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    outline: none;
    color: #fff;
    background-color: #337ab7;
    border: none;
    border-radius: 5px;
    box-shadow: 0 5px #999;
  }

  .button:hover {
    background-color: #4b779c;
  }

  .button:active {
    background-color: #3f74a3;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }

  .panel {
    border: 1px solid #337ab7;
    border-radius: 5px;
    height: 100%;
    text-align: center;
    margin-bottom: 2px auto;
  }

  .header {
    background: #337ab7;
    height: 80px;
    color: white;
    text-align: center;
  }

  table {
    border-collapse: collapse;
    margin: 0 auto;
    text-align: center;
    width: 100%;
  }

  ::-webkit-scrollbar {
    width: 0px;
  }

  table thead th {
    background-color: #e6eaec;
    width: 100px;
  }

  table tr {
    padding: 5px;
    background: #fff;
  }

  table tr:hover {
    background: #dbdedf;
  }
</style>