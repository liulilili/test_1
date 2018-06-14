<template>
    <div>
        <Header activeIndex="regionList"></Header>

        <el-breadcrumb separator-class="el-icon-arrow-right" class="region-info-breadcrumb">
            <el-breadcrumb-item :to="{ path: '/regionList' }">代理区域</el-breadcrumb-item>
            <el-breadcrumb-item>区域详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-main class="list-main-block">
            <div class="region-info-title">
                <span>{{regionInfo.regionInfo[2]}}</span><span
                    class="region-info-city">（{{regionInfo.regionInfo[1]}}）</span>
            </div>

            <div class="region-info-main">
                <el-button-group>
                    <el-button :type="currentShow?'primary':''" @click="showRegion" class="region-info-title-button">
                        <img v-if="currentShow" src="../../assets/u275.png" class="region-info-title-icon"/>
                        <img v-if="!currentShow" src="../../assets/u792_1.png" class="region-info-title-icon"/>
                        区域数据详情
                    </el-button>
                    <el-button :type="currentShow?'':'primary'" @click="showSchool" class="region-info-title-button">
                        <img v-if="!currentShow" src="../../assets/u797.png" class="region-info-title-icon"/>
                        <img v-if="currentShow" src="../../assets/u280.png" class="region-info-title-icon"/>
                        区域学校列表
                        <el-popover v-if="!currentShow"
                                    effect="dark"
                                    popper-class="list-popper"
                                    placement="right-start"
                                    width="180"
                                    trigger="click">
                            <div class="list-question font-family">
                                <b>当前班级：</b>已绑该校的教师在洋葱平台创建的未解散班级个数
                                <br>
                                <b>全部教师：</b>已绑该校的所有教师总人数
                                <br>
                                <b>全部学生：</b>已绑该校的所有学生总人数
                                <br>
                                <b>当前购买金牌提分辅导的学生：</b>该校“全部学生”里，所持(初中数学)VIP的有效期覆盖当前日期的学生里，至少一项有效(初中数学)VIP(含未激活)的授权方式来自付费订单的学生。
                            </div>
                            <i class="el-icon-onion-wenhao region-info-question list-question-icon" style="float: right"
                               slot="reference"></i>
                        </el-popover>
                    </el-button>
                </el-button-group>

                <div v-if="currentShow">
                    <div class="region-info-data">
                        <el-card class="box-card" :body-style="{ padding: '0px' }">
                            <div slot="header" class="clearfix">
                                <img src="../../assets/u507.png" class="region-info-card-icon"/>
                                <span class="region-info-h2">用户规模</span>
                                <el-popover
                                        effect="dark"
                                        popper-class="list-popper"
                                        placement="right-start"
                                        width="180"
                                        trigger="click">
                                    <div class="list-question font-family">
                                        <b>当前建班教师：</b>创建该区域“当前洋葱班级”的当前建班教师
                                        <br>
                                        <b>当前班内学生：</b>该区域“当前洋葱班级”里的全部学生
                                    </div>
                                    <i class="el-icon-onion-wenhao list-question-icon" slot="reference"></i>
                                </el-popover>
                            </div>
                            <div>
                                <el-row>
                                    <el-col :span="4" class="region-info-block">
                                        <div class="grid-content">管辖学校</div>
                                        <div class="grid-content-black">
                                            <h1>{{regionInfo.schoolCount}}</h1>
                                            <span>所</span>
                                        </div>
                                    </el-col>
                                    <el-col :span="4" class="region-info-block">
                                        <div class="grid-content">当前洋葱班级</div>
                                        <div class="grid-content-black">
                                            <h1>{{regionInfo.roomCount}}</h1>
                                            <span>个</span>
                                        </div>
                                    </el-col>
                                    <el-col :span="4" class="region-info-block">
                                        <div class="grid-content">当前洋葱教师</div>
                                        <div class="grid-content-black">
                                            <h1>{{regionInfo.teacherCount}}</h1>
                                            <span>人</span>
                                        </div>
                                    </el-col>
                                    <el-col :span="4" class="region-info-block">
                                        <div class="grid-content">当前洋葱学生</div>
                                        <div class="grid-content-black">
                                            <h1>{{regionInfo.studentCount}}</h1>
                                            <span>人</span>
                                        </div>
                                    </el-col>
                                    <el-col :span="4" class="region-info-block">
                                        <div class="grid-content">当前建班教师</div>
                                        <div class="grid-content-black">
                                            <h1>{{regionInfo.createRoomTeacherCount}}</h1>
                                            <span>人</span>
                                        </div>
                                    </el-col>
                                    <el-col :span="4" class="region-info-block">
                                        <div class="grid-content">当前班内学生</div>
                                        <div class="grid-content-black">
                                            <h1>{{regionInfo.schoolCount}}</h1>
                                            <span>人</span>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-card>
                    </div>

                    <div class="region-info-data">
                        <el-card class="box-card" :body-style="{ padding: '0px' }">
                            <div slot="header" class="clearfix">
                                <img src="../../assets/u768.png" class="region-info-card-icon"/>
                                <span class="region-info-h2">付费情况</span>
                                <el-popover
                                        effect="dark"
                                        popper-class="list-popper"
                                        placement="right-start"
                                        width="180"
                                        trigger="click">
                                    <div class="list-question font-family">
                                        <b>体验过金牌提分辅导的学生(含试用)：</b>该区域“当前洋葱学生”里，获得过(初中数学)VIP授权的学生
                                        <br>
                                        <b>当前体验金牌提分辅导的学生(含试用)：</b>该区域“体验过金牌提分辅导的学生(含试用)”里，所持(初中数学)VIP的有效期覆盖当前日期的学生。
                                        <br>
                                        <b>当前购买金牌提分辅导的学生：</b>该区域在“当前体验金牌提分辅导的学生(含试用)”里，至少一项有效(初中数学)VIP(含未激活)的授权方式来自付费订单的学生。
                                        <br>
                                        <span class="region-info-vip">注：<b>此处提及的"金牌提分辅导/VIP"，仅指初中数学一种。</b></span>
                                    </div>
                                    <i class="el-icon-onion-wenhao list-question-icon" slot="reference"></i>
                                </el-popover>
                            </div>
                            <div>
                                <el-row>
                                    <el-col :span="8" class="region-info-block">
                                        <div class="grid-content">体验过金牌提分辅导的学生(含试用)</div>
                                        <div class="grid-content-black">
                                            <h1 class="region-info-vip">{{regionInfo.experiencedVipCount}}</h1>
                                            <span>人</span>
                                        </div>
                                    </el-col>
                                    <el-col :span="8" class="region-info-block">
                                        <div class="grid-content">当前体验金牌提分辅导的学生(含试用)</div>
                                        <div class="grid-content-black">
                                            <h1 class="region-info-vip">{{regionInfo.experiencingVipCount}}</h1>
                                            <span>人</span>
                                        </div>
                                    </el-col>
                                    <el-col :span="8" class="region-info-block">
                                        <div class="grid-content">当前购买金牌提分辅导的学生</div>
                                        <div class="grid-content-black">
                                            <h1 class="region-info-vip">{{regionInfo.buyVipStudentCount}}</h1>
                                            <span>人</span>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-card>
                    </div>

                    <div class="region-info-data">
                        <el-card class="box-card" :body-style="{ padding: '0px' }">
                            <div slot="header" class="clearfix">
                                <img src="../../assets/u524p002.png" class="region-info-card-icon"/>
                                <span class="region-info-h2">新增情况</span>
                                <el-popover
                                        effect="dark"
                                        popper-class="list-popper"
                                        placement="right-start"
                                        width="180"
                                        trigger="click">
                                    <div class="list-question font-family">
                                        <b>周新增班级：</b>该区域“当前洋葱班级”的创建日期落在该周内的班级数量
                                        <br>
                                        <b>周新增教师：</b>该区域“当前洋葱教师”的注册时间落在该周内的教师总人数
                                        <br>
                                        <b>周新增学生：</b>该区域“当前洋葱学生”的注册时间落在该周内的学生总人数
                                        <br>
                                        <b>周新增班内学生数：</b>该区域已绑班的学生里，首次绑班时间落在该周内的学生总数
                                        <br>
                                        <b>周付费用户数：</b>该周“当前洋葱学生”里，该周为金牌提分辅导（初中数学）成功付过费的学生数
                                    </div>
                                    <i class="el-icon-onion-wenhao list-question-icon" slot="reference"></i>
                                </el-popover>
                            </div>
                            <div>
                                <el-table class="list-table"
                                          :data="latelyInfo"
                                          header-row-class-name="list-table-header"
                                          row-class-name="list-table-row">
                                    <el-table-column
                                            prop="region"
                                            align="left"
                                            label="统计时间段 (最近12周)">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.start | filterDate('.')}}</span>-<span>{{scope.row.end | filterDate('.')}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            prop="increaseRoom"
                                            align="left"
                                            label="周新增班级 (个)">
                                    </el-table-column>
                                    <el-table-column
                                            prop="increaseTeacher"
                                            align="left"
                                            label="周新增教师 (人)">
                                    </el-table-column>
                                    <el-table-column
                                            prop="increaseStudent"
                                            align="left"
                                            label="周新增学生 (人)">
                                    </el-table-column>
                                    <el-table-column
                                            prop="increaseRoomStudent"
                                            align="left"
                                            label="周新增班内学生数(人)">
                                    </el-table-column>
                                    <el-table-column
                                            prop="payUser"
                                            align="left"
                                            label="周付费用户数(人)">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-card>
                    </div>

                    <div class="region-info-data">
                        <el-card class="box-card" :body-style="{ padding: '0px' }">
                            <div slot="header" class="clearfix">
                                <img src="../../assets/u299.png" class="region-info-card-icon"/>
                                <span class="region-info-h2">活跃情况</span>
                                <el-popover
                                        effect="dark"
                                        popper-class="list-popper"
                                        placement="right-start"
                                        width="180"
                                        trigger="click">
                                    <div class="list-question font-family">
                                        <b>周活跃学生：</b>该区域"当前洋葱学生"里，该周有过活跃行为的学生总人数
                                        <br>
                                        <b>周活跃班内学生数：</b>该区域“当前班内学生”里，该周有过活跃行为的学生总人数
                                    </div>
                                    <i class="el-icon-onion-wenhao list-question-icon" slot="reference"></i>
                                </el-popover>
                            </div>
                            <div>
                                <el-table class="list-table"
                                          :data="latelyInfo"
                                          header-row-class-name="list-table-header"
                                          row-class-name="list-table-row">
                                    <el-table-column
                                            prop="region"
                                            align="left"
                                            label="统计时间段 (最近12周)">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.start | filterDate('.')}}</span>-<span>{{scope.row.end | filterDate('.')}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            prop="activeStudent"
                                            align="left"
                                            label="周活跃学生数 (人)">
                                    </el-table-column>
                                    <el-table-column
                                            prop="activeRoomStudent"
                                            align="left"
                                            label="周活跃班内学生数 (人)">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-card>
                    </div>
                </div>

                <div v-if="!currentShow">

                    <div class="list-title-right">
                        <span class="list-all">当前共查找到  <span class="text-blue">{{listTotal}}</span> 个代理区域</span>
                    </div>

                    <div class="region-info-data">
                        <el-table class="list-table"
                                  :data="schoolList"
                                  header-row-class-name="list-table-header"
                                  row-class-name="list-table-row">
                            <el-table-column
                                    prop="schoolId"
                                    align="left"
                                    min-width="150"
                                    label="学校ID">
                            </el-table-column>
                            <el-table-column
                                    prop="schoolName"
                                    align="left"
                                    min-width="100"
                                    label="学校名称">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="goToSchoolInfo(scope.row)">
                                        {{scope.row.schoolName}}
                                    </el-button>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="roomCount"
                                    align="left"
                                    label="当前班级(个)">
                            </el-table-column>
                            <el-table-column
                                    prop="teacherCount"
                                    align="left"
                                    label="全部教师(人)">
                            </el-table-column>
                            <el-table-column
                                    prop="studentCount"
                                    align="left"
                                    label="全部学生(人)">
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
                                    <el-button type="text" size="small" @click="showSchoolInfo(scope.row)">查看简介
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                        <el-dialog
                                title="学校简介"
                                :visible.sync="regionInfoDialog"
                                width="50%">
                            <el-row>
                                <el-col :offset="6">
                                    <div>
                                        区域名称：{{currentInfo.schoolName}}
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :offset="6" class="list-dialog-name" v-if="regionInfo.regionInfo">
                                    <div>
                                        所属区域：{{regionInfo.regionInfo[2]}}-{{regionInfo.regionInfo[1]}}-{{regionInfo.regionInfo[0]}}
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :offset="6" class="list-dialog-name">
                                    <div>
                                        代理商名称：{{regionRelation.name}}
                                    </div>
                                </el-col>
                            </el-row>
                        </el-dialog>
                    </div>
                </div>
            </div>
        </el-main>
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
                activeName: 'second',
                currentShow: true,
                regionInfo: {
                    regionInfo: ['', '', '']
                },
                latelyInfo: [],
                currentAreaCode: this.$router.currentRoute.params.regionCode,
                regionInfoDialog: false,
                schoolList: [],
                listTotal: 0,
                currentInfo: {},
                regionRelation: {
                    name: '',
                },
            }
        },
        mounted() {
            this.getAreaInfoData();
        },
        methods: {
            showRegion() {
                this.currentShow = true;
                this.getAreaInfoData();
            },
            showSchool() {
                this.currentShow = false;
                this.getSchoolListData();
            },
            getAreaInfoData() {
                let url = window.url.host + '/area/detail?region=' + this.currentAreaCode;
                this.$http.get(url, this.getHeader()).then((response) => {
                    this.regionInfo = response.data.data;
                    this.latelyInfo = response.data.history;
                    this.checkUserToken(response.headers)
                }, (err) => {
                    if (err.status === 401) {
                        this.exitLogin();
                    }
                });
            },
            getRegionRelation(code) {
                let url = window.url.host + '/user/region-relation?region=' + code;
                this.$http.get(url, this.getHeader()).then((response) => {
                    if (response.data.agency) {
                        this.regionRelation = response.data.agency;
                    }
                }, (err) => {
                    if (err.status === 401) {
                        this.exitLogin();
                    }
                    console.log(err)
                });
            },
            getSchoolListData() {
                let url = window.url.host + '/school/list?region=' + this.currentAreaCode;
                this.$http.get(url, this.getHeader()).then((response) => {
                    this.listTotal = response.data.length;
                    this.schoolList = response.data;
                    this.checkUserToken(response.headers)
                }, (err) => {
                    if (err.status === 401) {
                        this.exitLogin();
                    }
                });
            },
            goToSchoolInfo(data) {
                this.$router.push('/schoolInfo/' + data.schoolId);
            },
            showSchoolInfo(data) {
                this.currentInfo = data;
                this.getRegionRelation(data.region);
                this.regionInfoDialog = true;
            }
        },
        filters: {
            filterDate: (value, mark) => {
                mark = mark || '-';
                if (!value) return '--';
                let date = new Date(value);
                let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
                let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
                return date.getFullYear() + mark + month + mark + day
            },
        }
    }
</script>

<style scoped>
    .list-dialog-name {
        margin-top: 20px;
    }

    .region-info-title-icon {
        margin-left: 20px;
        vertical-align: bottom;
        height: 13px;
    }

    .region-info-card-icon {
        margin-right: 5px;
        height: 15px;
    }

    .region-info-title-button {
        padding-right: 40px;
    }

    .region-info-question {
        position: absolute;
        font-size: 14px;
    }

    .region-info-breadcrumb {
        padding: 10px 0 0 40px;
    }

    .region-info-title {
        padding: 0 0 20px 10px;
        font-size: 22px;
        font-weight: 100;
        border-bottom: 1px solid #999;
    }

    .region-info-city {
        color: #999;
    }

    .region-info-main {
        margin: 20px 10px;
    }

    .list-title-right {
        float: right;
    }

    .region-info-data {
        padding-top: 40px;
    }

    .grid-content {
        font-size: 14px;
        text-align: center;
        margin-top: 20px
    }

    .region-info-h2 {
        font-size: 18px;
    }

    .grid-content-black h1 {
        display: inline;
        position: relative;
    }

    .grid-content-black span {
        position: absolute;
        margin-left: 15px;
        font-size: 14px;
        color: #999;
        margin-top: 5px;
    }

    .list-all {
        margin-right: 15px;
        font-size: 15px;
    }

    .grid-content-black {
        color: #666;
        line-height: 80px;
        text-align: center;
    }

    .region-info-block {
        height: 120px;
        border-right: 1px solid #ebeef5;
    }

    .region-info-vip {
        color: #FFC005;
    }
</style>