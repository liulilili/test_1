<template>
    <div class="header-height">
        <el-header class="header-onion">


            <el-menu :default-active="activeIndex" menu-trigger="click" background-color="#5c90ea"
                     class=" header-menu-height header-menu-position" mode="horizontal">
                <div class="header-menu-index header-menu-height">
                    <img src="../assets/u195.png" class="herder-onion-logo">
                    洋葱数学渠道管理系统
                </div>

                <el-menu-item index="regionList" @click="jumpPage('regionList')" class="header-menu-height">数据看板
                </el-menu-item>
                <el-menu-item v-if="currentRole===('superAdmin'||'agencyManager')" index="userManage" @click="jumpPage('userManage')" class="header-menu-height">用户管理
                </el-menu-item>

                <el-submenu index="3" popper-class="header-submenu" class="header-user header-menu-height">
                    <template slot="title">
                        <div class="header-user-block">
                            <img src="../assets/u203.png" class="herder-user-icon">
                        </div>
                        {{username}}
                    </template>
                    <el-menu-item index="3-1" @click="dialogVisible = true">修改密码</el-menu-item>
                    <el-menu-item index="3-2" @click="exitLogin">退出</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-header>

        <el-dialog
                :visible.sync="dialogVisible"
                title="修改登录密码"
                width="580px">
            <el-form ref="passwordForm" status-icon :model="passwordForm" :rules="rules" label-width="150px">
                <el-form-item label="当前登录账号：">
                    <span class="header-current-user">{{username}}</span>
                </el-form-item>
                <el-form-item label="当前登录密码：" prop="currentPass">
                    <el-input v-model="passwordForm.currentPass" type="password" placeholder="请输入当前登录密码"></el-input>
                </el-form-item>
                <el-form-item  label=" 新登录密码：" prop="oldPass">
                    <el-input v-model="passwordForm.oldPass" type="password" placeholder="8-20个英文字母/数字/符号,不能是纯数字或纯字母"></el-input>
                </el-form-item>
                <el-form-item label="确认新登录密码：" prop="newPass">
                    <el-input v-model="passwordForm.newPass" type="password" placeholder="请保持两次出入密码一致"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="header-edit-button" type="primary" @click="submitForm('passwordForm')">确认修改
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props: {
            activeIndex: {
                default: 'regionList'
            }
        },
        data() {
            let validateOldPass = (rule, value, callback) => {
                let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (!reg.test(value)) {
                    console.log(value)
                    callback(new Error('8-20个英文字母/数字/符号,不能是纯数字或纯字母'));
                } else {
                    callback();
                }
            };
            let validateNewPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.passwordForm.oldPass) {
                    callback(new Error('请保持两次出入密码一致!'));
                } else {
                    callback();
                }
            };
            let validateCurrentPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return {
                dialogVisible: false,
                username:this.getCookie('YCUsername')||'',
                passwordForm: {
                    currentPass: '',
                    oldPass: '',
                    newPass: ''
                },
                rules: {
                    currentPass: [
                        {validator: validateCurrentPass, trigger: 'click',required:true}
                    ],
                    oldPass: [
                        {validator: validateOldPass, trigger: 'click',required:true}
                    ],
                    newPass: [
                        {validator: validateNewPass, trigger: 'click',required:true}
                    ]
                },
                currentRole :this.getCookie('YCRole')
            }
        },
        methods: {
            jumpPage(key, keyPath) {
                this.$router.push('/' + key)
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.changePassword();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            changePassword() {
                this.$http.post(window.url.host + '/password/change', {
                    old: this.passwordForm.currentPass,
                    new: this.passwordForm.newPass
                }, {
                    headers: {
                        'Authorization':this.getCookie('YCUserToken')
                    }
                }).then((response) => {
                    console.log(response);
                    this.delCookie('YCUserToken');
                    this.$router.push('/login');
                }, (err) => {
                    if(err.body.message === '账号或密码错误') {
                        this.$message.error('当前登录密码输入不正确');
                    }
                    console.log(err)
                });
            },
        }
    }
</script>

<style scoped>
    .el-header {
        padding: 0;
        height: 30px !important;
    }

    .header-height {
        height: 40px;
    }

    .herder-onion-logo {
        width: 21px;
        height: 21px;
        vertical-align: middle
    }

    .header-current-user {
        color: #CC0000;
    }

    .header-edit-button {
        width: 100%;
    }

    .header-onion {
        background: #5c90ea;
        color: white;
        min-width: 960px;
        box-shadow: 10px 5px 10px #888888;
    }

    .header-menu-height {
        height: 30px !important;
        line-height: 30px !important;
    }

    .header-menu-index {
        float: left;
        margin: 0 60px;
    }

    .header-user {
        float: right;
        margin-right: 60px;
        color: white;
    }

    .header-user button {
        padding: 0 !important;
    }

    .header-user-block {
        text-align: center;
        border: 1px solid white;
        width: 23px;
        height: 23px;
        margin-top: 2px;
        margin-right: 5px;
        float: left;
        border-radius: 100%;
    }

    .herder-user-icon {
        width: 15px;
        height: 17px;
        vertical-align: unset;
    }

    .el-menu--horizontal > .el-menu-item.is-active {
        border-bottom: 2px solid white !important;
        color: white !important;
    }

    .el-menu--horizontal > .el-menu-item {
        color: rgb(228, 228, 228);
    }

    .el-menu-item {
        padding: 0 !important;
        margin: 0 20px;
    }

    .el-menu--horizontal {
        border-right: none;
        border-bottom: none !important;
    }

    .el-menu-item:focus, .el-menu-item:hover {
        background: #5c90ea !important;
    }

</style>