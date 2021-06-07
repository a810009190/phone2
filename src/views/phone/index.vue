<template>
    <div id="box">
        <Header/>
        <div class="container">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h3 style="text-align: center;">手机支持情况统计</h3>
                </div>
                <form>
                    <select class="form-control" style="width:98%; text-align: center" @change="getBrand($event)">
                        <option value="huawei">华为</option>
                        <option value="vivo">VIVO</option>
                        <option value="xiaomi">小米</option>
                        <option value="oppo">OPPO</option>
                        <option value="google">谷歌</option>
                        <option value="nokia">诺基亚</option>
                        <option value="meizu">魅族</option>
                        <option value="samsung">三星</option>
                    </select>
                    <Button type="button" class="btn btn-primary" style="width:99%" @click="tolName()">查看该品牌手机情况</Button>
                </form>
                <table class="table  table-hover table-bordered" >
                    <tr>
                        <th v-for='item in phoneList' :key="item">
                            {{item}}
                        </th>
                    </tr>
                    <tr v-for='item in currentList' :key="item">
                        <td>{{item.model}}</td>
                        <td>{{item.Android_version}}</td>
                        <td>{{item.Vendor_version}}</td>
                        <td>{{item.isRoot}}</td>
                        <td><button class="btn btn-primary" @click="handleToDetail(item.id)">查看详情</button></td>
                    </tr>
                </table>
            </div>
        </div>

    </div>

</template>

<script>
import Header from '@/components/Header';
export default {
    
    name: 'phone',
    components:{
        Header
    },
    data(){
        return{
            brandName: '',
            listName: '',
            currentList:[],
            phoneList: ["手机型号", "系统版本", "厂商系统版本", "Root情况", "查看详情"],
            huaweiList: [
                    {
                        "id": 1001,
                        "model": "LLD-AL20(9i)",
                        "Android_version": "9",
                        "Vendor_version": "EMUI8.0.0",
                        "isRoot": "未root"
                    },
                    {
                        "id": 1002,
                        "model": "JSN-AL00a",
                        "Android_version": "10",
                        "Vendor_version": "EMUI10.0.0",
                        "isRoot": "未root"
                    },
                    {
                        "id": 1003,
                        "model": "COR-Al00(Honor play)",
                        "Android_version": "9",
                        "Vendor_version": "EMUI9.1.0",
                        "isRoot": "未root"
                    },
                    {
                        "id": 1004,
                        "model": "OXF-AN00（荣耀V30）",
                        "Android_version": "10",
                        "Vendor_version": "EMUI11.0.0（手机上展示magic4.0）",
                        "isRoot": "未root"
                    },
                    {
                        "id": 1005,
                        "model": "PE-TL00M",
                        "Android_version": "4.4.2",
                        "Vendor_version": "EMUI3",
                        "isRoot": "未root"
                    },
                    {
                        "id": 1006,
                        "model": "LIO-AN00m(mate30)",
                        "Android_version": "10",
                        "Vendor_version": "EMUI11.0.0",
                        "isRoot": "未root"
                    },
                    {
                        "id": 1007,
                        "model": "SLA-AL00",
                        "Android_version": "7",
                        "Vendor_version": "5.1.3",
                        "isRoot": "已root"
                    },
                    {
                        "id": 1008,
                        "model": "VNS-AL00",
                        "Android_version": "6",
                        "Vendor_version": "4.1.3",
                        "isRoot": "未root"
                    },
                    {
                        "id": 1009,
                        "model": "H60-L03",
                        "Android_version": "6",
                        "Vendor_version": "4.0.3",
                        "isRoot": "未root"
                    },
                    {
                        "id": 1010,
                        "model": "TIT-AL00",
                        "Android_version": "5.1",
                        "Vendor_version": "EMUI3.1",
                        "isRoot": "未root"
                    }
            ],
            vivoList:[
                {
                    "id": 1101,
                    "model": "Y66",
                    "Android_version": " 6.0.1",
                    "Vendor_version": "Funtouch os_3.0",
                    "isRoot": "未root"
                },
                {
                    "id": 1102,
                    "model": "X9s L",
                    "Android_version": "8.1.0",
                    "Vendor_version": "Funtouch os_4.0",
                    "isRoot": ""
                },
                {
                    "id": 1103,
                    "model": "X50",
                    "Android_version": "10",
                    "Vendor_version": "Funtouch os_10.5",
                    "isRoot": "未root"
                },
                {
                    "id": 1104,
                    "model": "V1818CA(Y93s)",
                    "Android_version": "8.1.0",
                    "Vendor_version": "Funtouch OS_9",
                    "isRoot": "未root"
                },
                {
                    "id": 1105,
                    "model": " X9i",
                    "Android_version": "7.1.2",
                    "Vendor_version": "Funtouch os_3.1",
                    "isRoot": ""
                },
                {
                    "id": 1106,
                    "model": " X9",
                    "Android_version": "7.1.2",
                    "Vendor_version": "Funtouch os_3.1",
                    "isRoot": "未root"
                },
                {
                    "id": 1107,
                    "model": "Y85A",
                    "Android_version": "8.1.0",
                    "Vendor_version": "Funtouch os_4.0",
                    "isRoot": ""
                },
                {
                    "id": 1108,
                    "model": "V1914A(iQOO Neo)",
                    "Android_version": "10",
                    "Vendor_version": "Funtouch os_9",
                    "isRoot": ""
                },
                {
                    "id": 1109,
                    "model": "V1901A(Y3)",
                    "Android_version": "9",
                    "Vendor_version": "Funtouch os_9",
                    "isRoot": ""
                },
                {
                    "id": 1110,
                    "model": "V2072A（S9）",
                    "Android_version": "11",
                    "Vendor_version": "OriginOS 1.0",
                    "isRoot": "未root"
                },
                {
                    "id": 1111,
                    "model": "Y69A",
                    "Android_version": "7",
                    "Vendor_version": "Funtouch OS_3.2",
                    "isRoot": "未root"
                }
            ],
            xiaomiList:[
                {
                    "id": 1201,
                    "model": "MI9",
                    "Android_version": "10",
                    "Vendor_version": "MIUI12",
                    "isRoot": "未root"
                },
                {
                    "id": 1202,
                    "model": "Redmi8A",
                    "Android_version": "9",
                    "Vendor_version": "11.0.10.0.PCPCNXM(稳定版)",
                    "isRoot": "未root"
                },
                {
                    "id": 1203,
                    "model": "小米5S",
                    "Android_version": "8",
                    "Vendor_version": "9.4.25",
                    "isRoot": "未root"
                }
            ],
            oppoList:[
                {
                    "id": 1301,
                    "model": "RMX1901(realme x)",
                    "Android_version": "9",
                    "Vendor_version": "ColorOS_6.0",
                    "isRoot": "未root"
                },
                {
                    "id": 1302,
                    "model": "PCAM10（A9）",
                    "Android_version": "10",
                    "Vendor_version": "ColorOS_7.1",
                    "isRoot": "未root"
                },
                {
                    "id": 1303,
                    "model": "PBCM30(k1)",
                    "Android_version": "10",
                    "Vendor_version": "ColorOS_7.1",
                    "isRoot": "未root"
                },
                {
                    "id": 1304,
                    "model": "R11st",
                    "Android_version": "8.1.0",
                    "Vendor_version": "ColorOS_5.2.2",
                    "isRoot": "未root"
                },
                {
                    "id": 1305,
                    "model": "R9m",
                    "Android_version": "5.1",
                    "Vendor_version": "ColorOS_3.0",
                    "isRoot": "未root"
                },
                {
                    "id": 1306,
                    "model": "R11",
                    "Android_version": "7.1.1",
                    "Vendor_version": "ColorOS_3.1",
                    "isRoot": "未root"
                },
                {
                    "id": 1307,
                    "model": "PCGM00(K3)",
                    "Android_version": "10",
                    "Vendor_version": "V7.1",
                    "isRoot": "未root"
                },
                {
                    "id": 1308,
                    "model": "R11st",
                    "Android_version": "8.1.0",
                    "Vendor_version": "V5.2.1",
                    "isRoot": "未root"
                },
                {
                    "id": 1309,
                    "model": "PEGM00",
                    "Android_version": "11",
                    "Vendor_version": "V11.1",
                    "isRoot": "未root"
                }
            ],
            googleList:[
                {
                    "id": 1401,
                    "model": "Pixel 2XL",
                    "Android_version": "10",
                    "Vendor_version": "",
                    "isRoot": "未root"            
                }
            ],
            nokiaList:[
                {
                    "id": 1501,
                    "model": "x7",
                    "Android_version": "9",
                    "Vendor_version": "HMD Global",
                    "isRoot": ""
                },
                {
                    "id": 1502,
                    "model": "x6",
                    "Android_version": "9",
                    "Vendor_version": "HMD Global",
                    "isRoot": "未root"
                }
            ],
            meizuList:[
                {
                    "id": 1701,
                    "model": "m3 note",
                    "Android_version": "7",
                    "Vendor_version": "Flyme 6.3.0.3A",
                    "isRoot": "已root"
                },
                {
                    "id": 1702,
                    "model": "note6",
                    "Android_version": "7.1.2",
                    "Vendor_version": "Flyme8.0.5.0A",
                    "isRoot": "未root"
                }
            ],
            samsungList:[
                {
                    "id": 1601,
                    "model": " Galaxy S7（SM-G9300）",
                    "Android_version": "8",
                    "Vendor_version": "Samsung Experience9.0",
                    "isRoot": "未root"
                },
                {
                    "id": 1602,
                    "model": "Galaxy S8+（SM-G9550）",
                    "Android_version": "9",
                    "Vendor_version": "",
                    "isRoot": "未root"
                },
                {
                    "id": 1603,
                    "model": "SM-A5160",
                    "Android_version": "10",
                    "Vendor_version": "OneUI2.1",
                    "isRoot": "已root"
                }
            ]
        }

        },
        methods: {
            getBrand(e){
                let val = e.target.value;
                console.log(val)
                this.brandName = val
            },
            tolName(){
                console.log(111);
                this.listName = this.brandName + 'List';
                let ln = this.listName;
                this.currentList = this[ln]
            },
            handleToDetail(id){
                this.$router.push('/detail/'+id)
            }
        }
    
}
</script>

<style>

</style>
