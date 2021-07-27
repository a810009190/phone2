<template>
  <div id="box">
    <!-- <el-alert 
    type="success"
    show-icon
    style="position:absolute; left:calc(50% - 200px); top 20px; width:400px; height:30px"
    center
    v-show="isShow"
    >
    切换成功
    </el-alert>-->
    <div class="container">
      <div class="panel">
        <div class="header">
          <h3 style="text-align: center;">
            手机支持情况统计
            <span class="return" @click="drawer = true">更多</span>
          </h3>
          <el-drawer title="更多" :visible.sync="drawer">
            <hr/>
            <h4>添加一个品牌</h4>
            <div class="drawerBox">
              <span>品牌名称</span><input type="text" placeholder="中文名" v-model="inputVal11"><input type="text" placeholder="英文名" v-model="inputVal12">
              <button class="nbutton" @click="addBrand()">提交</button>
              <button class="nbutton" @click="clear1()">重置</button>
            </div>
            <div :class="isSuccess ? 'success':'fail'">{{messageBox1}}</div>
            <hr/>
            <h4>添加一个手机</h4>
            <div class="drawerBox">
              <span>手机品牌</span>
              <input type="text" v-model="inputVal2">
            </div>
            <div class="drawerBox">
              <span>手机型号</span>
              <input type="text" v-model="inputVal3">
            </div>
            <div class="drawerBox">
              <span>安卓版本</span>
              <input type="text" v-model="inputVal4">
            </div>
            <div>
              <button class="nbutton" style="height:36px;">提交</button>
              <button class="nbutton" style="height:36px;" @click="clear234()">重置</button>
            </div>
          </el-drawer>
        </div>
        <form>
          <select style="textalign:center" @change="getBrand($event)">
            <option
              v-for="(item,index) in brandData"
              :key="index"
              :value="item.brandName"
            >{{item.displayName}}</option>
          </select>
          <Button class="button" type="button" style="width:99%" @click="tolName()">查看该品牌手机情况</Button>
        </form>
        <div class="fa">
          <table class="tbe">
            <tr>
              <th v-for="(item, index) in phoneList" :key="index">{{item}}</th>
            </tr>
            <tr v-for="(item, index) in currentList" :key="index">
              <td>{{item.model}}</td>
              <td>{{item.Android_version}}</td>
              <td>{{item.Vendor_version}}</td>
              <td>{{item.isRoot}}</td>
              <td>
                <button
                  class="nbutton"
                  type="button"
                  @click="handleToDetail(item.id, item.model)"
                >查看详情</button>
              </td>
              <td>
                <button
                  class="nbutton"
                  type="button"
                  @click="handleToModify(item.id, item.model)"
                >更新数据</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "phone",
  components: {
    Header
  },
  data() {
    return {
      messageBox1:"",
      isSuccess: true,
      inputVal11:"",
      inputVal12:"",
      inputVal2:"",
      inputVal3:"",
      inputVal4:"",
      drawer: false,
      isShow: false,
      alldata: {},
      brandName: "huaweiList",
      currentList: [],
      phoneList: [
        "手机型号",
        "系统版本",
        "厂商系统版本",
        "Root情况",
        "查看详情",
        "更新数据"
      ],
      huaweiList: [],
      oppoList: [],
      vivoList: [],
      googleList: [],
      nokiaList: [],
      meizuList: [],
      samsungList: [],
      allList: [],
      xiaomiList: [],
      brandData: [],
      brandNum: 0
    };
  },
  methods: {
    // 获取当前选项的value值
    getBrand(e) {
      let val = e.target.value;
      this.brandName = val;
      switch (val) {
        case "huaweiList":
          this.brandNum = 0;
          break;
        case "vivoList":
          this.brandNum = 1;
          break;
        case "xiaomiList":
          this.brandNum = 2;
          break;
        case "oppoList":
          this.brandNum = 3;
          break;
        case "googleList":
          this.brandNum = 4;
          break;
        case "nokiaList":
          this.brandNum = 5;
          break;
        case "meizuList":
          this.brandNum = 6;
          break;
        case "samsungList":
          this.brandNum = 7;
          break;
        // default:
        //   break;
      }
      // console.log(this.brandNum);
    },
    // 渲染所选列表数据
    tolName(index) {
      // this.changeShow();
      // setTimeout(()=>{this.changeShow()},3000)
      this.$message({
        message: "切换成功",
        type: "success"
      });
      this.currentList = this.allList[this.brandNum];
    },
    // changeShow(){
    //   this.isShow = !this.isShow
    // },
    // 查看详情按钮点击跳转并传参
    handleToDetail(id, model) {
      console.log(id);
      this.$router.push({
        path: "/detail/" + id,
        query: {
          brandName: this.brandName,
          model: model
        }
      });
    },
    handleToModify(id, model) {
      this.$router.push({
        path: "/modify/" + id,
        query: {
          brandName: this.brandName,
          model: model
        }
      });
    },
    clear1(){
      this.inputVal11 = "";
      this.inputVal12 = "";
    },
    clear234(){
      this.inputVal2 = "";
      this.inputVal3 = "";
      this.inputVal4 = "";
    },
    addBrand(){
      if(!this.inputVal11 || !this.inputVal12){
        this.messageBox1 = "请输入品牌名称！";
        this.isSuccess = false;
        return
      }
      let data = {
        brandName: this.inputVal12 + "List",
        brand: this.inputVal12,
        brandNum: this.brandData.length,
        displayName: this.inputVal11,
      }
      this.$axios.post("http://172.16.10.124:3000/addBrand", data).then(res =>{
        if(res.data == "ok"){
          this.messageBox1 = "添加成功！";
          this.isSuccess = true;
        }
      });
    }
  },
  mounted() {
    // 拿到手机各品牌设备数据
    this.$axios.get("http://172.16.10.124:3000/phoneList").then(res => {
      this.alldata = res.data;
      // console.log(res.data);
      for (var i = 0; i < res.data.length; i++) {
        if (this.alldata[i].brand == "huawei") {
          let lh = this.alldata[i];

          this.huaweiList.push(lh);

          // console.log(this.huaweiList)
        } else if (this.alldata[i].brand == "oppo") {
          let lo = this.alldata[i];

          this.oppoList.push(lo);
        } else if (this.alldata[i].brand == "xiaomi") {
          let lx = this.alldata[i];

          this.xiaomiList.push(lx);
        } else if (this.alldata[i].brand == "vivo") {
          let lv = this.alldata[i];

          this.vivoList.push(lv);
        } else if (this.alldata[i].brand == "google") {
          let lg = this.alldata[i];

          this.googleList.push(lg);
        } else if (this.alldata[i].brand == "nokia") {
          let ln = this.alldata[i];

          this.nokiaList.push(ln);
        } else if (this.alldata[i].brand == "meizu") {
          let lm = this.alldata[i];

          this.meizuList.push(lm);
        } else if (this.alldata[i].brand == "samsung") {
          let ls = this.alldata[i];

          this.samsungList.push(ls);
        }
      }
      this.allList.push(
        this.huaweiList,
        this.vivoList,
        this.xiaomiList,
        this.oppoList,
        this.googleList,
        this.nokiaList,
        this.meizuList,
        this.samsungList
      );
      this.currentList = this.huaweiList;
    });

    this.$axios.get("http://172.16.10.124:3000/brandList").then(res => {
      this.brandData = res.data;
    });
  }
};
</script>
<style>
select {
  width: auto;
  margin: 0;
  padding: 0 45%;
}
option {
  position: absolute;
  left: 50%;
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
.btn {
  margin: 5px 5px 8px 5px !important;
  padding: 6px 12px;
  background: #337ab7;
  color: white;
}
.fa {
  max-height: 780px;
  overflow: auto;
  width: 100%;
}
table {
  border-collapse: collapse;
  margin: 0 auto;
  text-align: center;
  width: 100%;
}
table td,
table th {
  padding: 0 !important;
  border: 1px solid #e6eaec;
  color: #666;
  line-height: 40px;
  width: 323.25px !important;
  height: 68px !important;
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

.nbutton {
  display: inline-block;
  padding: 2px 15px;
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
select {
  margin: 6px;
  appearance: normal;
}
select option {
  text-align: center;
}
h3 {
  padding-top: 20px;
  position: relative;
}
::-webkit-scrollbar {
  width: 0px;
}
/* .inContainer{
  scrollbar-width: none;
} */
.return {
  position: absolute;
  right: 0;
}
.el-drawer {
  color: black !important;
}
.drawerBox {
  display: flex;
}
.drawerBox h3,h4,span {
  margin: 5px;
}
.drawerBox input {
  flex: 1;
  margin: 5px;
}
hr{
  border: 1 dashed;
}
.success{
  color: #33cc33;
}
.fail{
  color: red;
}
</style>
