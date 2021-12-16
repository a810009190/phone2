<template>
  <div id="box">
    <keep-alive>
      <Header></Header>
    </keep-alive>
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
            <hr>
            <h4>添加一个品牌</h4>
            <div class="drawerBox">
              <span>品牌名称</span>
              <input type="text" placeholder="中文名" v-model="inputValCn">
              <input type="text" placeholder="英文名" v-model="inputValEn">
              <button class="nbutton" @click="addBrand()">提交</button>
              <button class="nbutton" @click="clearBrand()">重置</button>
            </div>
            <div :class="isSuccess ? 'success':'fail'">{{messageBox1}}</div>
            <hr>
            <h4>添加一个手机</h4>
            <div class="drawerBox">
              <span>手机品牌</span>
              <select class="dSelect" style="text-align:center" @change="getBrand2($event)">
                <option
                  v-for="(item,index) in brandList"
                  :key="index"
                  :value="item.brandNum"
                >{{item.displayName}}</option>
              </select>
            </div>
            <div class="drawerBox">
              <span>手机型号</span>
              <input type="text" v-model="inputValMo">
            </div>
            <div class="drawerBox">
              <span>安卓系统</span>
              <input type="text" v-model="inputValAve">
            </div>
            <div class="drawerBox">
              <span>厂商系统</span>
              <input type="text" v-model="inputValVve">
            </div>
            <div class="drawerBox">
              <span>ROOT没</span>
              <input type="text" v-model="inputValRo" placeholder="root了填 已root 没root填 未root">
            </div>
            <div :class="isSuccess ? 'success':'fail'">{{messageBox2}}</div>
            <div>
              <button class="nbutton" style="height:36px;" @click="addPhone()">提交</button>
              <button class="nbutton" style="height:36px;" @click="clearPhone()">重置</button>
            </div>
          </el-drawer>
        </div>
        <form>
          <!-- <select style="textalign:center" @change="getBrand($event)">
            <option
              v-for="(item,index) in brandList"
              :key="index"
              :value="item.brandNum"
            >{{item.displayName}}</option>
          </select> -->
          <el-select v-model='value' placeholder="请选择" @change="getBrand()" :popper-append-to-body="false">
            <el-option
            v-for='item in brandList'
            :key='item.brandNum'
            :label='item.displayName'
            :value="`${item.brandNum}|${item.displayName}`"
            >
            </el-option>
          </el-select>
          <Button class="button" type="button" style="width:99%" @click="tolName()">查看该品牌手机情况</Button>
        </form>
        <div class="table_area">
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
      url: this.Common.g_url,
      selectVal1: "0",
      brandList: [],
      messageBox1: "",
      messageBox2: "",
      isSuccess: true,
      inputValCn: "",
      inputValEn: "",
      selectVal: "",
      inputValMo: "",
      inputValVve: "",
      inputValAve: "",
      inputValRo: "",
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
      allList: [],
      brandNum: 0,
      value:'0|华为',
      label:'华为'
    };
  },
  methods: {
    // 获取当前选项的value值
    getBrand() {
      // value是当前列表中的编号，label是品牌中文名
      let [value,label] = this.value.split('|');
      this.brandNum = value;
      console.log("切换品牌后 品牌序号"+this.brandNum);
      this.label = label;
    },
    getBrand2(e) {
      this.selectVal1 = e.target.value;
    },
    // 渲染所选列表数据
    tolName(index) {
      // this.changeShow();
      // setTimeout(()=>{this.changeShow()},3000)
      this.$message({
        message: "切换成功",
        type: "success"
      });
      
      // 记住当前选择的品牌，把他们存在cookie里
      this.$cookies.set('brandNum',this.brandNum);
      this.brandName = this.brandList[this.brandNum].brandName;
      this.$cookies.set('label',this.label);
      this.currentList = this.allList[this.brandNum];
    },
    // changeShow(){
    //   this.isShow = !this.isShow
    // },
    // 查看详情按钮点击跳转并传参
    handleToDetail(id, model) {
      let cookieNum = this.$cookies.get("brandNum");
      if(cookieNum){
        this.brandName = this.brandList[cookieNum].brandName;
      }else{
        this.brandName = "huaweiList";
      }
      
      console.log('查看详情'+id);
      this.$router.push({
        path: "/detail/" + id,
        query: {
          brandName: this.brandName,
          model: model
        }
      });
    },
    handleToModify(id, model) {
      let cookieNum = this.$cookies.get("brandNum");
      if(cookieNum){
        this.brandName = this.brandList[cookieNum].brandName;
      }else{
        this.brandName = "huaweiList";
      }
      console.log("更新数据"+id+"手机"+model);
      this.$router.push({
        path: "/modify/" + id,
        query: {
          brandName: this.brandName,
          model: model
        }
      });
    },
    dataDel(data) {
      let listArr = [];
      data.forEach((value, index) => {
        let obj = [];
        // 对data中的每个元素拿来和listArr中已有的数组项做对比
        for (let i = 0; i < listArr.length; i++) {
          if (value.brand == listArr[i][0].brand) {
            listArr[i].push(value);
            return;
          }
        }
        obj.push(value);
        listArr.push(obj);
      });
      return listArr;
    },
    clearBrand() {
      this.inputValCn = "";
      this.inputValEn = "";
    },
    clearPhone() {
      this.selectVal1 = "huawei";
      this.inputValMo = "";
      this.inputValVve = "";
      this.inputValAve = "";
      this.inputValRo = "";
    },
    addBrand() {
      if (!this.inputValCn || !this.inputValEn) {
        this.messageBox1 = "请输入品牌名称！";
        this.isSuccess = false;
        return;
      }
      let data = {
        brandName: "otherList",
        brand: this.inputValEn,
        brandNum: this.brandList.length,
        displayName: this.inputValCn
      };
      this.$axios.post(this.url + "/addBrand", data).then(res => {
        if (res.data == "ok") {
          this.messageBox1 = "添加成功,请立即为新品牌添加一部手机！！";
          this.isSuccess = true;
          this.brandList.push(data);
          let obj = [];
          this.allList.push(obj);
          // console.log(this.brandList);
        }else{
            this.messageBox2 = res.data;
            this.isSuccess = false;          
        }
        setTimeout(()=>{
          this.messageBox1 = "";
        }, 8000);
      });
    },
    addPhone() {
      if (!this.selectVal1 || !this.inputValMo || !this.inputValAve || !this.inputValVve || !this.inputValRo) {
        this.messageBox2 = "手机相关信息不得为空！";
        this.isSuccess = false;
        console.log(1);
        return;
      } else if (typeof parseInt(this.inputValAve) === "number" && isNaN(parseInt(this.inputValAve))) {
        this.messageBox2 = "手机版本号得填数字！";
        this.isSuccess = false;
        return;
      } else {
        let num = this.selectVal1;
        let nowNum = this.allList[num].length + 1;
        console.log(nowNum);
        let lastNum = nowNum > 9 ? nowNum : "0" + nowNum;
        let id = parseInt("1" + num + lastNum);
        let data = {
          id: id,
          model : this.inputValMo,
          Android_version : this.inputValAve,
          Vendor_version : this.inputValVve,
          isRoot : this.inputValRo,
          brand : this.brandList[num].brand
        };
        // console.log(data);

        this.$axios.post(this.url + "/addPhone", data).then(res => {
          if (res.data == "ok"){
            this.messageBox2 = "添加新手机成功，已经自动创建空模板！";
            this.isSuccess = true;
            this.allList[num].push(data);
          }else{
            this.messageBox2 = res.data;
            this.isSuccess = false;
            
            
          }
          setTimeout(()=>{
            this.messageBox2 = "";
          }, 8000);
        })

      }
    }
  },
  mounted() {
    // 拿到手机各品牌设备数据
    this.$axios.get(this.url+"/phoneList").then(res => {
      this.allList = this.dataDel(res.data);
      let cookieNum = this.$cookies.get("brandNum");
      console.log("cookie有？"+cookieNum)
      let label = this.$cookies.get("label");
      if(cookieNum && label){
        this.currentList = this.allList[cookieNum];
        this.label = label;
        this.value=cookieNum+'|'+this.label;
        this.brandNum = cookieNum;
        console.log(this.currentList);
      }else{
        this.currentList = this.allList[0];
        this.value='0|华为';
      }
      console.log('初始化所有列表：');
      console.log(this.allList[0]);
    });

    this.$axios.get(this.url+"/brandList").then(res => {
      this.brandList = res.data;
      console.log('初始化品牌列表：');
      console.log(this.brandList);
    });
  }
};
</script>
<style scoped>
.el-select {
  width: 90%;
  margin: 0;
  padding: 0;
}
select /deep/.el-select-dropdown__item
{
  text-align: center !important;
}

/deep/.el-input__inner
{
  text-align: center !important;
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
.table_area {
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
.el-select {
  margin: 6px;
  appearance: normal;
}
.el-select option {
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
  color: white;
}
.el-drawer {
  color: black !important;
}
.drawerBox {
  display: flex;
}
.drawerBox h3,
h4,
span {
  margin: 5px;
  color: black;
}
.drawerBox input,
select {
  flex: 1;
  margin: 5px;
}
hr {
  border: 1 dashed;
}
.success {
  color: #33cc33;
}
.fail {
  color: red;
}
.dSelect {
  padding: 0 36%;
}
</style>
