<template>
    <div>
        <Header activeIndex="regionList"></Header>
        <el-main class="list-main-block">
            <div class="list-main-border">
                <div class="list-main-title">
                    <span class="list-title-text">代理区域</span>
                    <el-popover
                            effect="dark"
                            popper-class="list-popper"
                            placement="right-start"
                            width="180"
                            trigger="click">
                        <div class="list-question font-family"><b>管辖学校</b>：根据已公开的行政信息确定的，该行政区管辖的全部学校
                            <br>
                            <b>当前洋葱班级</b>：该区域内已绑学校的教师在洋葱平台创建的当前未解散班级个数
                            <br>
                            <b>当前洋葱教师</b>：洋葱账号当前地理位置信息落在该区域的全部教师
                            <br>
                            <b>当前洋葱学生</b>：洋葱账号当前地理位置信息落在该区域的全部学生
                            <br>
                            <b>当前购买金牌提分辅导的学生</b>：该区域“当前洋葱学生”里，所持(初中数学)VIP的有效期覆盖当前日期的学生里，至少一项有效(初中数学)VIP(含未激活)的授权方式来自付费订单的学生。
                        </div>
                        <i class="el-icon-onion-wenhao list-question-icon" slot="reference"></i>
                    </el-popover>

                    <div class="list-title-right">
                        <span class="list-all">当前共查找到  <span class="text-blue">{{listTotal}}</span> 个代理区域</span>
                        <el-cascader
                                :options="regionTree"
                                @change="regionItemChange"
                                :props="props" placeholder="筛选城市"
                        ></el-cascader>
                    </div>
                </div>
            </div>

            <el-table class="list-table"
                      :data="areaList"
                      header-row-class-name="list-table-header"
                      row-class-name="list-table-row">
                <el-table-column
                        prop="region"
                        align="left"
                        label="区域ID">
                </el-table-column>
                <el-table-column
                        prop="regionInfo"
                        align="left"
                        min-width="130"
                        label="区域名称">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="goToRegionInfo(scope.row)">
                            {{scope.row.regionInfo[2]}}
                        </el-button>
                        <span class="list-area-text"> ({{scope.row.regionInfo[1]}})</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="schoolCount"
                        align="left"
                        label="管辖学校(所)">
                </el-table-column>
                <el-table-column
                        prop="roomCount"
                        align="left"
                        label="当前洋葱班级(个)">
                </el-table-column>
                <el-table-column
                        prop="studentCount"
                        align="left"
                        label="当前洋葱学生(人)">
                </el-table-column>
                <el-table-column
                        prop="teacherCount"
                        align="left"
                        label="当前洋葱教师(人)">
                </el-table-column>
                <el-table-column
                        prop="buyVipStudentCount"
                        min-width="180"
                        align="left"
                        label="当前购买金牌提分辅导的学生(人)">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        align="left">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showRegionInfo(scope.row)">查看简介</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog
                    title="区域简介"
                    :visible.sync="regionInfoDialog"
                    width="30%">
                <el-row>
                    <el-col :offset="6" class="" v-if="currentInfo.regionInfo">
                        <div>
                            区域名称：{{currentInfo.regionInfo[2]}}-{{currentInfo.regionInfo[1]}}-{{currentInfo.regionInfo[0]}}
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :offset="6" class="list-dialog-name">
                        <div>当前代理商：{{regionRelation.name}}</div>
                    </el-col>
                </el-row>
            </el-dialog>
        </el-main>

        <el-pagination class="list-paging"
                       background
                       @current-change="onChangePaging"
                       layout="prev, pager, next"
                       :current-page.sync="currentPage"
                       :page-size="pageCount"
                       :total="listTotal">
        </el-pagination>
    </div>
</template>

<script>
    import Header from "@/components/HeaderItem"

    export default {
        components: {
            Header,
        },
        data() {
            return {
                activeIndex: '1',
                areaList: [],
                listTotal: 0,
                regionTree: [],
                props: {
                    value: 'value',
                    label: 'label',
                    children: 'cities'
                },
                regionInfoDialog: false,
                currentInfo: {
                    regionInfo:['','','']
                },
                citiesTree: {},
                pageCount: 100,
                currentPage: 1,
                regionRelation:{
                    name:'',
                },
            }
        },
        mounted() {
            this.getAreaListData();
            this.getRegionTree();
        },
        methods: {
            showRegionInfo(data) {
                this.currentInfo = data;
                this.getRegionRelation(data.region);
                this.regionInfoDialog = true;
            },
            getRegionRelation(code){
                let url = window.url.host + '/user/region-relation?region='+code;
                this.$http.get(url, this.getHeader()).then((response) => {
                    if(response.data.agency) {
                        this.regionRelation = response.data.agency;
                    }
                }, (err) => {
                    if(err.status===401){
                        this.exitLogin();
                    }
                    console.log(err)
                });
            },
            onChangePaging(val) {
                this.currentPage = val;
                this.getAreaListData();
            },
            getAreaListData(code) {
                code = code || '';
                let url = window.url.host + '/area/list?region=' + code + '&skip=' + (this.currentPage - 1) * 100 + '&limit=' + this.currentPage * 100;
                this.$http.get(url, this.getHeader()).then((response) => {
                    this.listTotal = response.body.total;
                    this.areaList = response.body.rows;
                }, (err) => {
                    if(err.status===401){
                        this.exitLogin();
                    }
                    console.log(err)
                });
            },
            goToRegionInfo(data) {
                this.jumpPage('regionInfo', data.region)
            },
            jumpPage(key, keyPath) {
                let url = keyPath ? key + '/' + keyPath : key;
                this.$router.push('/' + url)
            },
            getRegionTree() {
                let url = window.url.host + '/region-tree';
                this.$http.get(url, this.getHeader()).then((response) => {
                    this.setRegionTree(response);
                }, (err) => {
                    console.log(err)
                });
            },
            setRegionTree(response) {
                for (let i = 0; i < response.data.length; i++) {
                    let province = response.data[i];
                    let provinceLabel = {
                        value: province.code,
                        label: province.name,
                        cities: [],
                    };
                    for (let k = 0; k < province.children.length; k++) {
                        let city = province.children[k];
                        let cityLabel = {
                            value: city.code,
                            label: city.name,
                        };
                        provinceLabel.cities.push(cityLabel)
                    }
                    this.regionTree.push(provinceLabel);
                }
            },
            regionItemChange(val) {
                if (val.length === 2) {
                    this.getAreaListData(val[1]);
                }
            },
        },

    }
</script>

<style scoped>

    .list-dialog-name {
        margin-top: 20px;
    }

    .list-table {
        margin-top: 10px;
    }

    .list-main-border {
        padding-bottom: 20px;
        border-bottom: 1px solid #ebeef5;
    }

    .list-main-title {
        color: #666;
        text-align: left;
        padding-left: 20px;
    }

    .list-title-text {
        font-size: 22px;
        font-weight: 100;
    }

    .list-all {
        margin-right: 15px;
        font-size: 15px;
    }

    .list-title-right {
        float: right;
    }

    .list-paging {
        text-align: center;
    }

    .list-area-text {
        color: #999;
    }

</style>