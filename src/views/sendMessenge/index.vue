<template>
  <div id="box">
    <keep-alive>
      <Header></Header>
    </keep-alive>
    <div class="container">
      <div class="panel">
        <div class="header">
          <h3>17132955291微信验证</h3>
        </div>
        <div class="txt">
          <div class="imageBox">
            <img src="./image/2.jpg" alt>
            <svg
              t="1630575162641"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2143"
              width="200"
              height="200"
            >
              <path
                d="M938.5 535.8h-851c-12.8 0-23.3-10.4-23.3-23.3 0-12.8 10.4-23.3 23.3-23.3h851c12.8 0 23.3 10.4 23.3 23.3-0.1 12.8-10.5 23.3-23.3 23.3z"
                fill="#7D7D7D"
                p-id="2144"
              ></path>
              <path
                d="M777.6 718.7c-6 0-11.9-2.3-16.5-6.8-9.1-9.1-9.1-23.8 0-32.9l145.3-145.3c11.7-11.7 11.7-30.7 0-42.3L761.2 346.1c-9.1-9.1-9.1-23.8 0-32.9 9.1-9.1 23.8-9.1 32.9 0l145.3 145.3c29.8 29.8 29.8 78.3 0 108.1L794.1 711.8c-4.6 4.6-10.5 6.9-16.5 6.9z"
                fill="#7D7D7D"
                p-id="2145"
              ></path>
            </svg>
            <img src="./image/3.jpg" alt>
          </div>

          <h2>
            请先在手机上选择
            <strong>短信验证</strong>进入图2界面再点击下方发短信！
          </h2>
          <h2>
            <button class="nbutton" @click="sendMessenge()">发短信！</button>
          </h2>
          <h2 class="wait" v-if="isshow">请等待....</h2>
        </div>
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
      isshow: false
    };
  },
  methods: {
    sendMessenge() {
      this.isshow = true;
      console.log(this.isshow);
      var self = this;

      this.$axios
        .get(this.url+"/sendmessenge")
        .then(function(res) {
          console.log(res.data);
          if (res.data == "0") {
            setTimeout(function() {
              let r = confirm("短信发送失败，手机被拿走了");
              if (1) {
                self.isshow = false;
                console.log(self.isshow);
              }
            }, 5000);
            return;
          }
          setTimeout(function() {
            let r = confirm("短信发送成功，请点击我已发送短信，下一步");
            if (1) {
              self.isshow = false;
              console.log(self.isshow);
            }
          }, 5000);
        })
        .catch(function(error) {
          // 请求失败处理
          console.log(error);
          setTimeout(function() {
              let r = confirm("短信发送失败，请检查手机");
              if (1) {
                self.isshow = false;
                console.log(self.isshow);
              }
            }, 5000);
        });
    }
  }
};
</script>
<style scoped>
.txt {
  margin-top: 50px;
  margin-bottom: 50px;
}
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
  font-size: 24px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #337ab7;
  border: none;
  border-radius: 4px;
  margin: 10px;
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
.drawerBox h3,
h4,
span {
  margin: 5px;
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
h1 {
  text-align: center;
}
p {
  text-align: center;
}
.wait {
  color: red;
}
img {
  width: 20%;
  height: 20%;
}
</style>
