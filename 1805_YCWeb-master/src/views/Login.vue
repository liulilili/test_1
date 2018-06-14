<template>
    <div class="login-block">
        <el-card class="login-box-card">
            <img src="../assets/u33.png" class="login-icon">
            <div class="login-title">渠道管理系统</div>

            <el-form ref="form" :model="form" :rules="rules" class="login-form">
                <el-form-item prop="phone">
                    <el-input v-model="form.phone"
                              placeholder="请输入内容"
                              prefix-icon="el-icon-onion-wo" clearable>
                    </el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input v-model="form.password"
                              placeholder="请输入内容"
                              prefix-icon="el-icon-onion-suo" type="password" clearable>
                    </el-input>
                </el-form-item>

                <el-form-item class="login-checkbox">
                    <el-checkbox v-model="form.remember" label="记住账号"></el-checkbox>
                </el-form-item>

                <el-button type="primary" class="login-button" @click="signIn('form')">登录</el-button>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                centerDialogVisible: true,
                form: {
                    phone: this.getCookie('YCPhone') || '',
                    password: this.getCookie('YCPassword') || '',
                    remember: JSON.parse(this.getCookie('YCRemember')||'false') || false
                },
                rules: {
                    phone: [{required: true, message: '请输入登录账号', trigger: 'click'}],
                    password: [{required: true, message: '请输入登录密码', trigger: 'click'}]
                }
            }
        },
        methods: {
            signIn(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.postSignInData(this.form)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            postSignInData(data) {
                this.$http.post(window.url.host + '/signin', data).then((response) => {
                    this.setStorageInfo(data, response);
                    this.$router.push('/regionList');
                }, (err) => {
                    this.$message.error('账号或密码错误');
                    console.log(err)
                });
            },
            setStorageInfo(form, data) {
                if (form.remember) {
                    this.setCookie("YCPhone", form.phone, 7);
                    this.setCookie("YCPassword", form.password, 7);
                    this.setCookie("YCRemember", true, 7);
                } else {
                    this.setCookie("YCPhone", '', 7);
                    this.setCookie("YCPassword", '', 7);
                    this.setCookie("YCRemember", false, 7);
                }
                this.setCookie("YCRole", data.body.role, 7);
                this.setCookie("YCUserToken", data.headers.map.authorization[0], 7);
                this.setCookie("YCUsername", data.body.name, 7);
            },

        },
    }
</script>

<style scoped>
    .login-block {
        position: fixed;
        width: 100%;
        height: 100%;
        background: #5c8fea;
        padding-top: 50px;
    }

    .login-form {
        margin-top: 50px;
    }

    .login-checkbox {
        text-align: left;
    }

    .login-box-card {
        width: 350px;
        margin: auto;
        text-align: center;
    }

    .login-icon {
        width: 136px;
        height: 55px;
    }

    .login-button {
        width: 100%;
    }

    .login-title {
        font-size: 36px;
        color: #578CEE;
    }
</style>