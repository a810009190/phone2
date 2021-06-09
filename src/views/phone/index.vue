<template>
  <div id="box">
    <div class="container">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <h3 style="text-align: center;">手机支持情况统计</h3>
        </div>
        <form>
          <select
            class="form-control"
            style="width:99%; text-align: center"
            @change="getBrand($event)"
          >
            <option value="huaweiList">华为</option>
            <option value="vivoList">VIVO</option>
            <option value="xiaomiList">小米</option>
            <option value="oppoList">OPPO</option>
            <option value="googleList">谷歌</option>
            <option value="nokiaList">诺基亚</option>
            <option value="meizuList">魅族</option>
            <option value="samsungList">三星</option>
          </select>
          <Button
            type="button"
            class="btn btn-primary"
            style="width:99%"
            @click="tolName()"
          >查看该品牌手机情况</Button>
        </form>
        <table class="table table-hover table-bordered">
          <tr>
            <th v-for="(item, index) in phoneList" :key="index">{{item}}</th>
          </tr>
          <tr v-for="(item, index) in currentList" :key="index">
            <td>{{item.model}}</td>
            <td>{{item.Android_version}}</td>
            <td>{{item.Vendor_version}}</td>
            <td>{{item.isRoot}}</td>
            <td>
              <button type="primary" @click="handleToDetail(item.id, item.model)">查看详情</button>
            </td>
            <td>
              <button type="primary" @click="handleToModify(item.id, item.model)">更新数据</button>
            </td>
          </tr>
        </table>
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
      alldata: {},
      brandName: "",
      currentList: [],
      phoneList: [
        "手机型号",
        "系统版本",
        "厂商系统版本",
        "Root情况",
        "查看详情",
        "更新数据"
      ]
    };
  },
  methods: {
    // 获取当前选项的value值
    getBrand(e) {
      let val = e.target.value;
      this.brandName = val;
    },
    // 渲染所选列表数据
    tolName() {
      this.currentList = this.alldata[this.brandName];
    },
    // 查看详情按钮点击跳转并传参
    handleToDetail(id, model) {
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
    }
  },
  mounted() {
    // 拿到手机各品牌设备数据
    this.$axios.get("/data/phone.json").then(res => {
      this.alldata = res.data;
      this.currentList = res.data.huaweiList;
    });
  }
};
</script>
