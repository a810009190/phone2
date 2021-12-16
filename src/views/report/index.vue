<template>
  <div id="box">
    <keep-alive>
      <Header></Header>
    </keep-alive>
    <div class="container">
      <div class="panel">
        <div class="header">
          <h3>生成测试报告</h3>
        </div>
        <!-- <form>
          <div class="inputBox">
            <span>软件名称</span>
            <input type="text">
          </div>
          <div class="inputBox">
            <span>软件版本号</span>
            <input type="text">
          </div>
          <div class="inputBox">
            <p>版本更新内容</p>
            <textarea name id cols="30" rows="10"></textarea>
          </div>
          <span>日常测试人员</span>
          <span>覆盖测试人员</span>
          <span>完成测试报告人员</span>
          <el-select v-model="value1" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </form>-->
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" >
          <span v-show="isShow1">测试报告生成成功 <strong>访问\\172.16.10.186\share获取报告</strong> </span>
          <span v-show="isShow2">报告正在生成，再等一会吧</span>
        </el-dialog>
        <!-- <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
          <span>测试报告生成成功 <a href="#">获取报告</a> </span>
        </el-dialog> -->
        <el-form ref="form" :model="form" label-width="100px" >
          <el-form-item label="软件名称">
              <el-select v-model="form.softName" placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="软件版本号">
            <el-input placeholder="填写软件大版本(和gitlab上版本筛选一致，不用加V)" v-model="form.softVersion"></el-input>
          </el-form-item>
          <el-form-item label="更新内容">
            <el-input type="textarea" v-model="form.release" resize="none" :rows="4" placeholder="release.txt该版本内容"></el-input>
          </el-form-item>
          <div style="margin-left:-70px;">
            <el-form-item label="日常测试" style="margin-top:80px;" class="inline">
              <el-select v-model="form.value1" placeholder="请选择" multiple>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="覆盖测试" class="inline">
              <el-select v-model="form.value2" placeholder="请选择" multiple>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="测试报告" class="inline">
              <el-select v-model="form.value3" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="日常测试时间" style="margin-top: 20px;">
            <el-date-picker
              v-model="form.timeValue1"
              type="daterange"
              popper-class="ddb"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="覆盖测试时间" style="margin-top: 20px;">
            <el-date-picker
              v-model="form.timeValue2"
              type="daterange"
              popper-class="ddb"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="测试报告时间" style="margin-top: 20px;">
            <el-date-picker
              v-model="form.timeValue3"
              type="daterange"
              popper-class="ddb"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="缺陷汇总">
            <div>
              <el-input
                style="width: 100px;position:absolute;left:0"
                v-model="moudle"
                placeholder="添加模块"
              ></el-input>
              <el-button style="position:absolute;left:125px;" @click="addMoudle">添加</el-button>
              <el-button style="position:absolute;left:190px" @click="cutMoudle()">撤销</el-button>
              <el-button style="position:absolute;left:265px" @click="clearMoudle()">重置</el-button>
            </div>
          </el-form-item>
          <el-form-item
            style="margin-top:20px;overflow:auto;height:265px;"
            label=" *严 重 程 度*第一排：严重第二排：一般第三排：轻微"
          >
            <table class="table table-hover table-bordered">
              <tr>
                <th v-for="(item,index) in form.moudle" :key="index">{{item}}</th>
              </tr>
              <tr>
                <td v-for="(item,index) in form.moudle" :key="index">
                  <!-- <el-button class="mbutton" @click="addNum(index)">+</el-button>
                  {{item.num}}
                  <el-button class="mbutton" @click="minusNum(index)">-</el-button>-->
                  <el-input-number
                    class="numberInput"
                    v-model="form.num1[index]"
                    :min="0"
                    :max="10"
                    label="严重"
                  ></el-input-number>
                </td>
              </tr>
              <tr>
                <td v-for="(item,index) in form.moudle" :key="index">
                  <el-input-number
                    class="numberInput"
                    v-model="form.num2[index]"
                    :min="0"
                    :max="10"
                    label="描述文字"
                  ></el-input-number>
                </td>
              </tr>
              <tr>
                <td v-for="(item,index) in form.moudle" :key="index">
                  <el-input-number
                    class="numberInput"
                    v-model="form.num3[index]"
                    :min="0"
                    :max="10"
                    label="描述文字"
                  ></el-input-number>
                </td>
              </tr>
            </table>
          </el-form-item>
          <el-form-item style="margin-top:-60px;"></el-form-item>
          <el-form-item>
            <el-button style="margin:0 auto;" @click="buildReport()">生成报告</el-button>
            <!-- <el-button style="margin-left:100px;" @click="getReport()">获取报告</el-button> -->
            <!-- <el-button style="margin-left:100px;" @click="btnClick()">测试WS</el-button> -->
          </el-form-item>
          <el-form-item style="margin:0 auto;">
            <span v-show="isShow3">正在生成报告，请耐心等待4-5分钟,生成成功会有提示....</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "sendMessenge",
  components: {
    Header
  },
  data() {
    return {
      url: this.Common.g_url,
      options: [
        {
          value: "汪䶮",
          label: "汪䶮"
        },
        {
          value: "师梦瑶",
          label: "师梦瑶"
        },
        {
          value: "翟泽雨",
          label: "翟泽雨"
        },
        {
          value: "魏晨雪",
          label: "魏晨雪"
        },
        {
          value: "吴彦祖",
          label: "吴彦祖"
        },
        {
          value: "憨八龟",
          label: "憨八龟"
        },
        {
          value: "皮卡丘",
          label: "皮卡丘"
        }
      ],
      options1: [
        {
          value: "雷电手机快取",
          label: "雷电手机快取"
        },
        {
          value: "雷电手机采集",
          label: "雷电手机采集"
        },
        {
          value: "自助取证终端",
          label: "自助取证终端"
        },
        {
          value: "雷电云取证",
          label: "雷电云取证"
        },
        {
          value: "雷电App智能分析",
          label: "雷电App智能分析"
        },
        {
          value: "物联网采集取证",
          label: "物联网采集取证"
        },
      ],
      sendData:'',
      isShow1:false,
      isShow2:false,
      isShow3:false,
      moudle: "",
      dialogVisible: false,
      form: {
        softName: "",
        item: "",
        softVersion: "",
        release: "",
        moudle: [],
        num1: [],
        num2: [],
        num3: [],
        tableList: [
          ["序号", "模块", "严重", "一般", "轻微", "BUG总和", "BUG占比(%)"]
        ],
        value1: "",
        value2: "",
        value3: "",
        timeValue1: "",
        timeValue2: "",
        timeValue3: "",
        url: ""
      },
      websock: null
    };
  },
  // 前端限制必填项
  // rules:{
  //   softName:[
  //     {required:true,message:'请输入软件名称',trigger:'blur'}
  //   ],
  //   softVersion:[
  //     {required:true,message:'请输入软件名称',trigger:'blur'}
  //   ]
  // },
  methods: {
    // 初始化ws,接收3355端口传输的信息
    initWebsocket(){
      if(typeof(WebSocket) === "undefined"){
        alert("您的浏览器不支持WebSocket");
        return false;
      }
      const wsurl = 'ws://172.16.10.186:3355';
      this.websock = new WebSocket(wsurl);
      this.websock.onopen = this.websocketonopen;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen(){
      console.log("WebSocket连接成功");
    },
    websocketonmessage(e){
      let dataJson = e.data;
      if(dataJson == "success"){
        this.isShow2 = false;
        this.dialogVisible = true;
        this.isShow1 = true;
        this.isShow3 = false;
      }
    },
    websocketonerror(e){
      console.log('连接失败的信息：' + e);
      this.initWebsocket();
    },
    websocketclose(e){
      console.log('断开连接：' + e);
    },
    btnClick(){

    },
    open(){
      let data = {file : this.form.softName + 'V' + this.form.softVersion + '测试报告.docx'};
      this.$axios.post(this.url+"/open",data);
    },
    addMoudle() {
      let obj = this.moudle;
      this.form.moudle.push(obj);
      this.moudle = "";
      this.form.num1.push(0);
      this.form.num2.push(0);
      this.form.num3.push(0);
      // console.log(this.form.num1);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    cutMoudle() {
      this.form.moudle.pop();
      this.form.num1.pop();
      this.form.num2.pop();
      this.form.num3.pop();
    },
    clearMoudle() {
      this.form.moudle = [];
      this.form.num1 = [];
      this.form.num2 = [];
      this.form.num3 = [];
    },
    // getReport(){
      
      
    //   this.$axios.post(this.url+"/exists",this.sendData).then(res => {
    //     if (res.data) {
    //       this.isShow2 = false;
    //       this.dialogVisible = true;
    //       this.isShow1 = true;
    //       this.isShow3 = false;
          
          
    //     } else {
    //       this.isShow1 = false;
    //       this.dialogVisible = true;
    //       this.isShow2 = true;
          
    //     }
    // });
    // },
    buildReport() {
      this.sendData = {file : this.form.softName + 'V' + this.form.softVersion + '测试报告.docx'};
      if (
        this.form.softName == "雷电手机快取" ||
        this.form.softName == "雷电手机采集"
      ) {
        this.form.item = "extractor/Issues";
        this.form.url = "https://jira.forensix.cn/projects/THFORENSIC/summary";
      } else if (this.form.softName == "自助取证终端") {
        this.form.item = "extractor/allinoneissue";
        this.form.url = "https://jira.forensix.cn/projects/SFT/summary";
      } else if (this.form.softName == "雷电云取证") {
        this.form.item = "mobilecloud/issues";
        this.form.url = "https://jira.forensix.cn/projects/THUCLOUD/summary";
      } else if (this.form.softName == "雷电App智能分析") {
        this.form.item = "apkanalysistool/terminal_issue";
        this.form.url = "https://jira.forensix.cn/projects/APPANALY/summary";
      } else if (this.form.softName == "物联网采集取证") {
        this.form.item = "iotforensic/issue";
        this.form.url = "https://jira.forensix.cn/projects/IOTFOREN/summary";
      }
      this.form.value1 = this.form.value1.join(",");
      this.isShow3 = true;
      this.form.value2 = this.form.value2.join(",");
      for (let i = 0; i < this.form.moudle.length; i++) {
        let arr = [
          (i + 1).toString(),
          this.form.moudle[i],
          this.form.num1[i].toString(),
          this.form.num2[i].toString(),
          this.form.num3[i].toString(),
          "",
          ""
        ];
        this.form.tableList.push(arr);
      }
      let data = this.form;
      this.$axios.post(this.url+"/report",data);
      // console.log(this.form.tableList);
      this.form = {
        softName: "",
        item: "",
        softVersion: "",
        release: "",
        moudle: [],
        num1: [],
        num2: [],
        num3: [],
        tableList: [
          ["序号", "模块", "严重", "一般", "轻微", "BUG总和", "BUG占比(%)"]
        ],
        value1: "",
        value2: "",
        value3: "",
        timeValue1: "",
        timeValue2: "",
        timeValue3: ""
      };
      // 连接WS，ws检测报告文件是否存在
      this.initWebsocket();
      setTimeout(()=>{
        if(this.websock.readyState === 1){
          let obj = this.sendData.file;
          this.websock.send(obj);
        }
      },500)
    }
  }
};
</script>
<style scoped>
.inline {
  display: inline-block !important;
  width: 30% !important;
}
table td,
table th {
  padding: 10px !important;
  border: 1px solid #e6eaec;
  color: #666;
  line-height: 40px;

  height: 48px !important;
}
.el-button {
  background: #337ab7;
  color: white;
  position: absolute;
}
.el-input {
  height: 30px;
  margin: 1px;
}
.el-form-item {
  width: 94%;
  height: 38px;
  margin-top: 20px;
}
.el-select {
  position: absolute;
  left: 0;
  line-height: 38px;
  width: 300px;
}
.el-date-editor {
  position: absolute;
  left: 0;
}
.el-picker-panel__content {
  width: 100px;
}
.el-date-table {
  margin: 0 !important;
  padding: 0 !important;
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
h3 {
  padding-top: 20px;
  position: relative;
}
.mbutton {
  background: #e6eaec;
}
table {
  width: 100%;
  height: 100%;
}
.el-input-number {
  width: 120px;
  padding: 0 0 0 0;
}
</style>
