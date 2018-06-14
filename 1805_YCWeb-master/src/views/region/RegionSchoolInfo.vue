<template>
    <div>
        <Header activeIndex="regionList"></Header>

        <el-breadcrumb separator-class="el-icon-arrow-right" class="region-info-breadcrumb">
            <el-breadcrumb-item :to="{ path: '/regionList' }">代理区域</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/regionList' }">区域详情</el-breadcrumb-item>
            <el-breadcrumb-item>学校详情</el-breadcrumb-item>
        </el-breadcrumb>

        <el-main class="list-main-block">
            <div class="region-info-title">
                <span>长沙市长郡中学（湖南省-长沙市-天心区）</span>
                <!--<span>{{regionInfo.regionInfo[2]}}</span><span class="region-info-city">（{{regionInfo.regionInfo[1]}}）</span>-->
            </div>

            <div class="region-info-main">
                <el-button-group>
                    <el-button :type="currentShow==='1'?'primary':''" @click="switchButton('1')"
                               class="region-info-title-button">
                        <img v-if="currentShow==='1'" src="../../assets/u275.png" class="region-info-title-icon"/>
                        <img v-if="currentShow!=='1'" src="../../assets/u792_1.png" class="region-info-title-icon"/>
                        学校数据详情
                    </el-button>
                    <el-button :type="currentShow==='2'?'primary':''" @click="switchButton('2')"
                               class="region-info-title-button">
                        <img v-if="currentShow==='2'" src="../../assets/u1480.png" class="region-info-title-icon"/>
                        <img v-if="currentShow!=='2'" src="../../assets/u981.png" class="region-info-title-icon"/>
                        学校班级列表
                        <el-popover v-if="currentShow==='2'"
                                    effect="dark"
                                    popper-class="list-popper"
                                    placement="right-start"
                                    width="180"
                                    trigger="click">
                            <div class="list-question font-family">
                                <b>教师：</b>创建该班级的教师用户名
                                <br>
                                <b>全部学生：</b>该班级里当前学生总人数
                                <br>
                                <b>当前购买金牌提分辅导的学生：</b>该班“全部学生”里，所持(初中数学)VIP的有效期覆盖当前日期的学生里，至少一项有效(初中数学)VIP(含未激活)的授权方式来自付费订单的学生
                            </div>
                            <i class="el-icon-onion-wenhao region-info-question list-question-icon"
                               slot="reference"></i>
                        </el-popover>
                    </el-button>
                    <el-button :type="currentShow==='3'?'primary':''" @click="switchButton('3')"
                               class="region-info-title-button">
                        <img v-if="currentShow==='3'" src="../../assets/u2122.png" class="region-info-title-icon"/>
                        <img v-if="currentShow!=='3'" src="../../assets/u979.png" class="region-info-title-icon"/>
                        学校教师列表
                        <el-popover v-if="currentShow==='3'"
                                    effect="dark"
                                    popper-class="list-popper"
                                    placement="right-start"
                                    width="180"
                                    trigger="click">
                            <div class="list-question font-family">
                                <b>当前建班：</b>该教师当前在洋葱平台创建的班级个数
                                <br>
                                <b>全部学生：</b>在洋葱平台上与该教师有绑定关系的所有学生总人数
                                <br>
                                <b>上周活跃学生：</b>上一个自然周的7天里，该教师的“全部学生”里，在洋葱APP有过活跃行为的学生数量
                                <br>
                                <b>体验过金牌提分辅导的学生(含试用)：</b>该教师“全部学生”里，获得过(初中数学)VIP授权的学生
                                <br>
                                <b>当前体验金牌提分辅导的学生(含试用)：</b>该教师“体验过金牌提分辅导的学生(含试用)”里，所持(初中数学)VIP的有效期覆盖当前日期的学生
                                <br>
                                <b>当前购买金牌提分辅导的学生：</b>该教师“当前体验金牌提分辅导的学生(含试用)”里，至少一项有效(初中数学)VIP(含未激活)的授权方式来自付费订单的学生。
                                <br>
                                <b>注册时间：</b>该教师当前在洋葱平台注册账号的时间
                                <br>
                                <b>上次活跃时间：</b>该教师上一次在洋葱app产生活跃行为的时间距离当前日期的天数差
                            </div>
                            <i class="el-icon-onion-wenhao region-info-question list-question-icon"
                               slot="reference"></i>
                        </el-popover>
                    </el-button>
                    <el-button :type="currentShow==='4'?'primary':''" @click="switchButton('4')"
                               class="region-info-title-button">
                        <img v-if="currentShow==='4'" src="../../assets/u1931.png" class="region-info-title-icon"/>
                        <img v-if="currentShow!=='4'" src="../../assets/u988.png" class="region-info-title-icon"/>
                        未选班学生列表
                    </el-button>
                </el-button-group>

                <div>
                    <div v-if="currentShow==='1'">
                        <!--信息-->
                        <div class="region-info-data">
                            <el-card class="box-card" :body-style="{ padding: '0px' }">
                                <div slot="header" class="clearfix">
                                    <img src="../../assets/u507.png" class="region-info-card-icon"/>
                                    <span class="region-info-h2">用户规模</span>
                                </div>
                                <div>
                                    <el-row>
                                        <el-col :span="8" class="region-info-block">
                                            <div class="grid-content">当前班级</div>
                                            <div class="grid-content-black">
                                                <h1>{{schoolInfo.roomCount}}</h1>
                                                <span>所</span>
                                            </div>
                                        </el-col>
                                        <el-col :span="8" class="region-info-block">
                                            <div class="grid-content">全部教师</div>
                                            <div class="grid-content-black">
                                                <h1>{{schoolInfo.teacherCount}}</h1>
                                                <span>人</span>
                                            </div>
                                        </el-col>
                                        <el-col :span="8 " class="region-info-block">
                                            <div class="grid-content">全部学生</div>
                                            <div class="grid-content-black">
                                                <h1>{{schoolInfo.studentCount}}</h1>
                                                <span>人</span>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-card>
                        </div>
                        <!--付费信息-->
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
                                                <h1 class="region-info-vip">{{schoolInfo.experiencedVipCount}}</h1>
                                                <span>人</span>
                                            </div>
                                        </el-col>
                                        <el-col :span="8" class="region-info-block">
                                            <div class="grid-content">当前体验金牌提分辅导的学生(含试用)</div>
                                            <div class="grid-content-black">
                                                <h1 class="region-info-vip">{{schoolInfo.experiencingVipCount}}</h1>
                                                <span>人</span>
                                            </div>
                                        </el-col>
                                        <el-col :span="8" class="region-info-block">
                                            <div class="grid-content">当前购买金牌提分辅导的学生</div>
                                            <div class="grid-content-black">
                                                <h1 class="region-info-vip">{{schoolInfo.buyVipStudentCount}}</h1>
                                                <span>人</span>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-card>
                        </div>
                        <!--新增列表-->
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
                        <!--活跃列表-->
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

                    <div v-if="currentShow==='2'">

                        <div class="list-title-right">
                            <span class="list-all">当前共查找到  <span class="text-blue">{{listTotal}}</span> 个班级</span>
                        </div>

                        <div class="region-info-data">
                            <el-table class="list-table" key="btable"
                                      :data="roomList"
                                      header-row-class-name="list-table-header"
                                      row-class-name="list-table-row">
                                <el-table-column
                                        prop="roomId"
                                        align="left"
                                        label="班级ID">
                                </el-table-column>
                                <el-table-column
                                        prop="roomName"
                                        align="left"
                                        label="班级名称">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small" @click="goToRoomInfo(scope.row)">
                                            {{scope.row.roomName}}
                                        </el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="createRoomTime"
                                        align="left"
                                        label="建班时间">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.createRoomTime | filterDate}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="teacherName"
                                        align="left"
                                        label="教师">
                                </el-table-column>
                                <el-table-column
                                        prop="studentCount"
                                        align="left"
                                        label="全部学生(人)">
                                </el-table-column>
                                <el-table-column
                                        prop="buyVipStudentCount"
                                        min-width="150"
                                        align="left"
                                        label="当前购买金牌提分辅导的学生(人)">
                                </el-table-column>
                                <el-table-column
                                        fixed="right"
                                        label="当前购买金牌提分辅导的学生占比"
                                        align="left">
                                    <template slot-scope="scope">
                                        {{(scope.row.buyVipStudentCount / scope.row.studentCount)||0}}%
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>

                    <div v-if="currentShow==='3'">

                        <div class="list-title-right">
                            <span class="list-all">当前共查找到  <span class="text-blue">{{listTotal}}</span> 个教师</span>
                        </div>

                        <div class="region-info-data">
                            <el-table class="list-table" key='cTable'
                                      :data="teacherList"
                                      header-row-class-name="list-table-header"
                                      row-class-name="list-table-row">
                                <el-table-column
                                        prop="teacherId"
                                        align="left"
                                        label="教师ID">
                                </el-table-column>
                                <el-table-column
                                        prop="teacherName"
                                        align="left"
                                        label="教师">
                                </el-table-column>
                                <el-table-column
                                        prop="roomCount"
                                        align="left"
                                        label="当前建班(个)">
                                </el-table-column>
                                <el-table-column
                                        prop="studentCount"
                                        align="left"
                                        label="全部学生(人)">
                                </el-table-column>
                                <el-table-column
                                        prop="weekActiveStudentCount"
                                        align="left"
                                        label="上周活跃学生(人)">
                                </el-table-column>
                                <el-table-column
                                        min-width="130"
                                        prop="experiencedVipCount"
                                        align="left"
                                        label="体验过金牌提分辅导的学生,含试用(人)">
                                </el-table-column>
                                <el-table-column
                                        min-width="130"
                                        label="当前体验金牌提分辅导的学生,含试用(人)"
                                        prop="experiencingVipCount"
                                        align="left">
                                </el-table-column>
                                <el-table-column
                                        min-width="130"
                                        label="当前购买金牌提分辅导的学生(人)"
                                        prop="buyVipStudentCount"
                                        align="left">
                                </el-table-column>
                                <el-table-column
                                        label="注册时间"
                                        prop="registerTime"
                                        align="left">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.registerTime | filterDate}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="上次活跃时间"
                                        prop="activeTime"
                                        align="left">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.registerTime | activeDate}}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>

                    <div v-if="currentShow==='4'">

                        <div class="list-title-right">
                            <span class="list-all">当前共查找到  <span class="text-blue">{{listTotal}}</span> 个学生</span>
                        </div>

                        <div class="region-info-data">
                            <el-table class="list-table" key='dTable'
                                      :data="unassignedList"
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
                currentSchoolId: '5abb761092a98114e16ca3f9',
                currentShow: '1',
                schoolInfo: {},
                listTotal: 0,
                latelyInfo: [],
                roomList: [],
                teacherList: [],
                unassignedList: [],
            }
        },
        mounted() {
            console.log(this.$router.currentRoute.params.schoolId)
            this.getSchoolInfoData();
        },
        methods: {
            goToRoomInfo(data) {
                this.$router.push('/roomInfo/' + data.roomId);
            },
            getSchoolInfoData() {
                let url = window.url.host + '/school/detail?schoolId=' + this.currentSchoolId;
                this.$http.get(url, this.getHeader()).then((response) => {
                    this.schoolInfo = response.data.data;
                    this.latelyInfo = response.data.history;
                    this.checkUserToken(response.headers)
                }, (err) => {
                    if (err.status === 401) {
                        this.exitLogin();
                    }
                });
            },
            getRoomListData() {
                let url = window.url.host + '/room/list?schoolId=' + this.currentSchoolId;
                this.$http.get(url, this.getHeader()).then((response) => {
                    this.listTotal = response.data.length;
                    this.roomList = response.data;
                    this.checkUserToken(response.headers)
                }, (err) => {
                    if (err.status === 401) {
                        this.exitLogin();
                    }
                });
            },
            getTeacherListData() {
                let url = window.url.host + '/teacher/list?schoolId=' + this.currentSchoolId;
                this.$http.get(url, this.getHeader()).then((response) => {
                    this.listTotal = response.data.length;
                    this.teacherList = response.data;
                    this.checkUserToken(response.headers)
                }, (err) => {
                    if (err.status === 401) {
                        this.exitLogin();
                    }
                });
            },
            getUnassignedListData() {
                let url = window.url.host + '/school/unassigned/list?schoolId=' + this.currentSchoolId;
                this.$http.get(url, this.getHeader()).then((response) => {
                    this.listTotal = response.data.length;
                    this.unassignedList = response.data;
                    this.checkUserToken(response.headers)
                }, (err) => {
                    if (err.status === 401) {
                        this.exitLogin();
                    }
                });
            },
            switchButton(num) {
                switch (num) {
                    case '1':
                        this.currentShow = num;
                        this.getSchoolInfoData();
                        break;
                    case '2':
                        this.currentShow = num;
                        this.getRoomListData();
                        break;
                    case '3':
                        this.currentShow = num;
                        this.getTeacherListData();
                        break;
                    case '4':
                        this.currentShow = num;
                        this.getUnassignedListData();
                        break;
                }
            },
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
            activeDate(value) {
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

    .region-info-question {
        position: absolute;
        font-size: 14px;
    }

    .list-title-right {
        float: right;
    }

    .region-info-main {
        margin: 20px 10px;
    }

    .region-info-city {
        color: #999;
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