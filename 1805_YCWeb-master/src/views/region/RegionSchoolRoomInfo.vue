<template>
    <div>
        <Header activeIndex="regionList"></Header>

        <el-breadcrumb separator-class="el-icon-arrow-right" class="region-info-breadcrumb">
            <el-breadcrumb-item :to="{ path: '/regionList' }">代理区域</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/regionList' }">区域详情</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/regionList' }">学校详情</el-breadcrumb-item>
            <el-breadcrumb-item>班级详情</el-breadcrumb-item>
        </el-breadcrumb>

        <el-main class="list-main-block">
            <div class="region-info-title">
                <span>{{roomInfo.roomName}}</span>
            </div>

            <div class="region-info-main">
                <el-button-group>
                    <el-button :type="currentShow?'primary':''" @click="showRoomInfo" class="region-info-title-button">
                        <img v-if="currentShow" src="../../assets/u275.png" class="region-info-title-icon"/>
                        <img v-if="!currentShow" src="../../assets/u792_1.png" class="region-info-title-icon"/>
                        班级数据详情
                    </el-button>
                    <el-button :type="currentShow?'':'primary'" @click="showStudentList"
                               class="region-info-title-button">
                        <img v-if="!currentShow" src="../../assets/u1931.png" class="region-info-title-icon"/>
                        <img v-if="currentShow" src="../../assets/u988.png" class="region-info-title-icon"/>
                        班级学生列表
                        <el-popover v-if="!currentShow"
                                    effect="dark"
                                    popper-class="list-popper"
                                    placement="right-start"
                                    width="180"
                                    trigger="click">
                            <div class="list-question font-family">
                                <b>学生用户名：</b>学生在洋葱平台注册的用户名
                                <br>
                                <b>学生备注姓名：</b>教师给学生备注的姓名
                                <br>
                                <b>注册时间：</b>学生注册洋葱PP的时间
                                <br>
                                <b>上次活跃时间：</b>学生上次在洋葱APP产生活跃行为的时间
                                <br>
                                <b>是否体验过金牌提分辅导：</b>学生是否体验过金牌提分辅导(初中数学)内容
                                <br>
                                <b>是否付过费：</b>学生是否成功购买过洋葱(初中数学)付费内容
                                <br>
                                <b>VIP剩余有效期：</b>学生当前所持的(初中数学)VIP(含未激活)有效天数之和，减去其中已使用过的(初中数学)VIP天数之差。
                                <br>
                                <b>VIP最后截止日：</b>当前日期加上学生的“VIP(初中数学)剩余有效期”之后的日期
                                <br>
                                <b class="region-info-vip">未选择班级的学生：</b>请在学校详情中查看“未选班学生列表”
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
                            </div>
                            <div>
                                <el-row>
                                    <el-col :span="6">
                                        <div class="room-info-black">
                                            全部学生
                                            <b class="room-info-count">{{roomInfo.studentCount}}</b>
                                            人
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
                                            <h1 class="region-info-vip">{{roomInfo.experiencedVipStudentCount}}</h1>
                                            <span>人</span>
                                        </div>
                                    </el-col>
                                    <el-col :span="8" class="region-info-block">
                                        <div class="grid-content">当前体验金牌提分辅导的学生(含试用)</div>
                                        <div class="grid-content-black">
                                            <h1 class="region-info-vip">{{roomInfo.experiencingVipStudentCount}}</h1>
                                            <span>人</span>
                                        </div>
                                    </el-col>
                                    <el-col :span="8" class="region-info-block">
                                        <div class="grid-content">当前购买金牌提分辅导的学生</div>
                                        <div class="grid-content-black">
                                            <h1 class="region-info-vip">{{roomInfo.buyVipStudentCount}}</h1>
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
                                <img src="../../assets/u299.png" class="region-info-card-icon"/>
                                <span class="region-info-h2">活跃情况</span>
                                <el-popover
                                        effect="dark"
                                        popper-class="list-popper"
                                        placement="right-start"
                                        width="180"
                                        trigger="click">
                                    <div class="list-question font-family">
                                        <b>周活跃学生：</b>该班"全部学生"里，该周有过活跃行为的学生总人数
                                        <br>
                                        <b>当周活跃学生占班内学生比：</b>该周该班“活跃学生”占该班“全部学生”百分比
                                        <br>
                                        <b>周新增学生：</b>该班“全部学生”里，加入该班的时间落在该周的学生总人数
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
                                            label="当周活跃学生占班内学生比">
                                        <template slot-scope="scope">
                                            {{(scope.row.activeRoomStudent / scope.row.roomStudent)||0}}%
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            prop="increaseStudent"
                                            align="left"
                                            label="周新增学生数 (人)">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-card>
                    </div>
                </div>

                <div v-if="!currentShow">

                    <div class="list-title-right">
                        <span class="list-all">当前共查找到  <span class="text-blue">{{listTotal}}</span> 个学生</span>
                    </div>

                    <div class="region-info-data">
                        <el-table class="list-table"
                                  :data="studentList"
                                  header-row-class-name="list-table-header"
                                  row-class-name="list-table-row">
                            <el-table-column
                                    prop="studentId"
                                    align="left"
                                    label="学生洋葱ID">
                            </el-table-column>
                            <el-table-column
                                    prop="studentName"
                                    align="left"
                                    label="学生用户名">
                                <template slot-scope="scope">
                                    {{scope.row.studentName||'--'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="studentNote"
                                    align="left"
                                    label="学生备注姓名">
                                <template slot-scope="scope">
                                    {{scope.row.studentNote||'--'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="registerTime"
                                    align="left"
                                    label="注册时间">
                                <template slot-scope="scope">
                                    <span>{{scope.row.registerTime | filterDate}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="activeTime"
                                    align="left"
                                    label="上次活跃时间">
                                <template slot-scope="scope">
                                    <span>{{scope.row.activeTime | activeDate}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    align="left"
                                    min-width="100"
                                    label="是否体验过金牌提分辅导">
                                <template slot-scope="scope">
                                    {{scope.row.isExperiencedVip?'是':'否'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="VIP最后截止日"
                                    prop="vipExpireTime"
                                    align="left">
                                <template slot-scope="scope">
                                    <span>{{scope.row.vipExpireTime | filterDate}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    min-width="130"
                                    label="VIP剩余有效期(天)"
                                    prop="residueVipDay"
                                    align="left">
                            </el-table-column>
                            <el-table-column
                                    label="手机号"
                                    prop="phoneNumber"
                                    align="left">
                                <template slot-scope="scope">
                                    <span>{{scope.row.phoneNumber||'--'}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
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
                currentRoomId: '5b1e430d1441725c140dcd20',//this.$router.currentRoute.params.roomId,
                currentShow: true,
                roomInfo: {},
                listTotal: 0,
                latelyInfo: [],
                studentList: [],
            }
        },
        mounted() {
            this.getRoomInfoData();
        },
        methods: {
            showRoomInfo() {
                this.currentShow = true;
                this.getRoomInfoData();
            },
            showStudentList() {
                this.currentShow = false;
                this.getRoomListData();
            },
            getRoomInfoData() {
                let url = window.url.host + '/room/detail?roomId=' + this.currentRoomId;
                this.$http.get(url, this.getHeader()).then((response) => {
                    this.roomInfo = response.data.data;
                    this.latelyInfo = response.data.history;
                    this.checkUserToken(response.headers)
                }, (err) => {
                    if (err.status === 401) {
                        this.exitLogin();
                    }
                });
            },
            getRoomListData() {
                let url = window.url.host + '/room/student/list?roomId=' + this.currentRoomId;
                this.$http.get(url, this.getHeader()).then((response) => {
                    this.listTotal = response.data.length;
                    this.studentList = response.data;
                    this.checkUserToken(response.headers)
                }, (err) => {
                    if (err.status === 401) {
                        this.exitLogin();
                    }
                });
            },
        },
        filters: {
            filterDate: (value, mark) => {
                mark = mark || '-';
                if (!value) {
                    return '--'
                }
                let date = new Date(value);
                let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
                let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
                return date.getFullYear() + mark + month + mark + day
            },
            activeDate(value) {
                if (!value) {
                    return '--'
                }
                let current = new Date().getTime();
                let active = new Date(value).getTime();

                let num = Math.floor((current - active) / (24 * 3600 * 1000));

                return num === 0 ? '今天' : num + ' 天前'
            },
        }
    }
</script>

<style scoped>
    .region-info-breadcrumb {
        padding: 10px 0 0 40px;
    }

    .region-info-title {
        padding: 0 0 20px 10px;
        font-size: 22px;
        font-weight: 100;
        border-bottom: 1px solid #999;
    }

    .region-info-card-icon {
        margin-right: 5px;
        height: 15px;
    }

    .region-info-title-icon {
        margin-left: 20px;
        vertical-align: bottom;
        height: 13px;
    }

    .region-info-title-button {
        padding-right: 40px;
    }

    .region-info-main {
        margin: 20px 10px;
    }

    .region-info-question {
        position: absolute;
        font-size: 14px;
    }

    .list-title-right {
        float: right;
    }

    .region-info-block {
        height: 120px;
        border-right: 1px solid #ebeef5;
    }

    .grid-content {
        font-size: 14px;
        text-align: center;
        margin-top: 20px
    }

    .room-info-count {
        font-size: 24px;
        margin: 0 40px;
    }

    .grid-content-black {
        color: #666;
        line-height: 80px;
        text-align: center;
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

    .room-info-black {
        line-height: 120px;
        padding-left: 50px;
    }

    .region-info-data {
        padding-top: 40px;
    }

    .region-info-vip {
        color: #FFC005;
    }

</style>