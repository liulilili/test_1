<template>
    <div>
        <Header activeIndex="userManage"></Header>
        <el-main class="list-main-block">
            <div class="user-title-right">
                <span class="user-title-right-span">当前查找到  <span class="text-blue">{{listTotal}}</span> 个用户</span>
                <el-checkbox v-model="isShow" @change="getShowUser">显示禁用账号</el-checkbox>
                <el-button class="user-title-right-button" type="primary" icon="el-icon-onion-jiaren" size="mini"
                           @click="addUser">新建用户
                </el-button>
            </div>
            <el-tabs @tab-click="getUserList">
                <el-tab-pane
                        :paneName="item.role"
                        v-for="(item, index) in editableTabs"
                        :key="item.role"
                        :label="item.key"
                >
                    <UserListItem :userList="userList" @showUserInfo="showUserInfo" @goToEdit="goToEdit"></UserListItem>
                </el-tab-pane>
            </el-tabs>
        </el-main>
        <UserInfo :userInfo="userInfo" :isShow="isShowUserInfo" @close="hideUserInfo" @goToEdit="goToEdit"></UserInfo>
        <EditUserInfo :isShow="isShowEditUserInfo" :isAdd="isAdd" :regionInfo="regionInfo" :regionList="regionList"
                      :userInfo="userInfo" @close="hideEditUserInfo" @saveEvent="editUserInfo"></EditUserInfo>
        <!--<UserRegion :regionList="regionList">-->

        <!--</UserRegion>-->
        <el-pagination class="list-paging"
                       @current-change="onChangePaging"
                       layout="prev, pager, next"
                       :page-size="pageCount"
                       :total="listTotal"
                       :current-page.sync="currentPage">
        </el-pagination>
    </div>
</template>

<script>
    import Header from "@/components/HeaderItem";
    import UserListItem from "@/components/UserListItem"
    import UserInfo from "@/components/user/UserInfo"
    import EditUserInfo from "@/components/user/EditUserInfo"
    import UserRegion from "@/components/user/UserRegion"

    export default {
        components: {
            Header,
            UserListItem,
            UserInfo,
            EditUserInfo,
            UserRegion,
        },
        data() {
            return {
                editableTabs: [
                    {
                        role: 'agency',
                        key: '渠道代理商'
                    },
                    {
                        role: 'agencyManager',
                        key: '区域渠道负责人'
                    },

                    {
                        role: 'teacherManager',
                        key: '教师服务负责人'
                    },
                    {
                        role: 'superAdmin',
                        key: '超级管理员'
                    }
                ],
                listTotal: 0,
                currentTabsRole: 'agency',
                isShow: true,
                userList: [],
                userInfo: {},
                isShowUserInfo: false,
                isShowEditUserInfo: false,
                regionList: [],
                pageCount: 100,
                regionInfo: {},
                currentPage: 1,
                isAdd: false,
            }
        },
        mounted() {
            this.getUserData();
            this.getRegion()
        },
        methods: {
            addUser() {
                this.userInfo = {
                    role: 'teacherManager',
                    status: 'enabled'
                };
                this.isAdd = true;
                this.isShowEditUserInfo = true;
            },
            getShowUser(val) {
                this.isShow = val;
                this.getUserData()
            },
            goToEdit(data) {
                this.isAdd = false;
                this.isShowUserInfo = false;
                this.isShowEditUserInfo = true;
                this.getUserInfo(data, false)
            },
            getUserList(tab) {
                this.currentTabsRole = tab.$attrs.paneName;
                this.getUserData();
            },
            onChangePaging(val) {
                this.currentPage = val;
                this.getUserData();
            },
            getUserData() {
                let status = this.isShow ? '' : 'enabled';
                let url = window.url.host + '/user-list?role=' + this.currentTabsRole +
                    '&status=' + status + '&skip=' + (this.currentPage - 1) * 100 + '&limit=' + this.currentPage * 100;
                this.$http.get(url, this.getHeader()).then((response) => {
                    this.userList = response.body.users;
                    this.listTotal = response.body.total;
                }, (err) => {
                    console.log(err)
                });
            },
            getRegion() {
                let url = window.url.host + '/region-tree';
                this.$http.get(url, this.getHeader()).then((response) => {
                    this.regionList = response.body;
                    this.getRegionInfo();
                }, (err) => {
                    console.log(err)
                });
            },
            getRegionInfo() {
                for (let i = 0; i < this.regionList.length; i++) {
                    let province = this.regionList[i];
                    this.regionInfo[province.code] = {code: province.code, name: province.name, children: {}};

                    for (let k = 0; k < province.children.length; k++) {
                        let city = province.children[k];
                        this.regionInfo[province.code].children[city.code] = {
                            code: city.code,
                            name: city.name,
                            children: {}
                        };

                        for (let j = 0; j < city.children.length; j++) {
                            let area = city.children[j];
                            this.regionInfo[province.code].children[city.code].children[area.code] = {
                                code: area.code,
                                name: area.name
                            }
                        }
                    }
                }
            },
            showUserInfo(value) {
                this.getUserInfo(value, true);
            },
            getUserInfo(value, isShow) {
                this.getOneUserData(value.id, isShow);
                if (value.role === 'agency' || value.role === 'agencyManager') {
                    this.getUserSelectTreeData(value.id);
                }
            },
            getOneUserData(id, isShow) {
                let url = window.url.host + '/user-list?id=' + id;

                this.$http.get(url, this.getHeader()).then((response) => {
                    this.userInfo = response.body.users[0];
                    this.isShowUserInfo = isShow

                }, (err) => {
                    console.log(err)
                });

            },
            getUserSelectTreeData(id) {
                let url = window.url.host + '/user-select-tree';
                this.$http.get(url + '?id=' + id, this.getHeader()).then((response) => {
                    console.log(response)
                }, (err) => {
                    console.log(err)
                });
            },
            hideUserInfo: function () {
                this.isShowUserInfo = false;
            },
            hideEditUserInfo() {
                this.isShowEditUserInfo = false;
            },
            editUserInfo: function (data) {
                if (!data.isAdd) {
                    this.updateUserData(data.data);
                } else {
                    this.addUserDate(data.data);
                }
            },
            getUpdateUserInfo(data) {
                let info = {
                    id: data.id,
                    name: data.name,
                    phone: data.phone,
                    email: data.email,
                    regions: data.regions,
                    role: data.role,
                    status: data.status,
                };
                if (data.password) {
                    info.password = data.password;
                }
                return info
            },
            updateUserData(data) {
                this.$http.put(window.url.host + '/user', this.getUpdateUserInfo(data), this.getHeader()).then((response) => {
                    this.successMessage('修改成功');
                    this.getUserData();
                    this.hideEditUserInfo();
                }, (err) => {
                    this.$message.error('修改失败');
                    console.log(err)
                });
            },
            addUserDate(data) {
                this.$http.post(window.url.host + '/user', data, this.getHeader()).then((response) => {
                    this.successMessage('添加成功');
                    this.getUserData();
                    this.hideEditUserInfo();
                }, (err) => {
                    this.$message.error('添加失败');
                    console.log(err)
                });
            },
            successMessage(value) {
                this.$message({
                    message: value,
                    type: 'success'
                });
            }
        }
    }
</script>

<style scoped>
    .list-paging {
        text-align: center;
    }

    .list-main-title {
        color: #666;
        text-align: left;
        padding-left: 20px;
    }

    .user-title-right-span {
        font-size: 15px;
        margin-right: 30px;
    }

    .user-title-right {
        position: absolute;
        right: 50px;
        line-height: 40px;
        width: 500px;
        z-index: 10;
    }

    .user-title-right-button {
        margin-left: 20px;
    }
</style>