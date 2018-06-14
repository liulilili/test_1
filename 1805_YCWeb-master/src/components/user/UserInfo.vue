<template>
    <el-dialog
            :visible.sync="userInfoDialogVisible"
            title="账号详情"
            width="880px"
            :before-close="close">
        <div class="userInfo_dialog_main">
            <div class="userInfo_dialog_title">
                <el-row>
                    <el-col :span="8">
                        <span>基本信息</span>
                    </el-col>
                    <el-col :span="16" class="userInfo_dialog_action">
                        <el-button type="text" @click="$emit('goToEdit', userInfo)"><i class="el-icon-edit"></i>编辑帐号</el-button>
                    </el-col>
                </el-row>

            </div>
            <div class="userInfo_dialog_content">
                <el-row>
                    <el-col :span="12" class="userInfo_dialog_item">
                        <div class="grid-content bg-purple">
                            <el-row>
                                <el-col :span="8">
                                    用户账号：
                                </el-col>
                                <el-col :span="16">
                                    {{userInfo.phone}}
                                </el-col>
                            </el-row>

                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple-light">
                            <el-row>
                                <el-col :span="8">
                                    用户名称：
                                </el-col>
                                <el-col :span="16">
                                    {{userInfo.name}}
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-row>
                                <el-col :span="8">
                                    邮箱：
                                </el-col>
                                <el-col :span="16">
                                    {{userInfo.email||'--'}}
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple-light">
                            <el-row>
                                <el-col :span="8">
                                    账号状态：
                                </el-col>
                                <el-col :span="16" :class="{ red: userInfo.status ==='disabled' }">
                                    {{userInfo.status !=='disabled'? '启用': '禁用'}}
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>


            </div>
            <div class="userInfo_dialog_title">
                <span>账户角色</span>
            </div>
            <div class="userInfo_dialog_content">
                <div   class="userInfo_dialog_role">
                    {{userInfo.role | userRole}}
                </div>

            </div>
            <div class="userInfo_dialog_title">
                <span>代理区域</span>
            </div>
            <div class="userInfo_dialog_content">


            </div>

        </div>
    </el-dialog>
</template>

<script>
    import ElCol from "element-ui/packages/col/src/col";
    import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";

    export default {
        components: {
            ElButton,
            ElCol},
        props: {
            userList: Array,
            isShow: {type:Boolean,default:false},
            userInfo: Object
        },
        data() {
            return {
                userInfoDialogVisible:  this.isShow
            }
        },
        methods: {
            close(){
                console.log('======close hahah')
                this.$emit('close')
            }
        },
        filters: {
            userRole: (value) => {
                const role = {
                    superAdmin: '超级管理员',
                    agencyManager: '区域渠道负责人',
                    agency: '渠道代理商',
                    teacherManager: '教师服务负责人'
                };
                return role[value]
            },
            formatDate: (date) => {

            },
            createData: (value) => {
                if (!value) return '';
                let date = new Date(value);
                return date.getFullYear() + '-' + date.getMonth() + 1 + '-' + date.getDate()
            }
        },
        watch: {
            isShow (val) {
                console.log(val)
                this.userInfoDialogVisible = val
            }
        },
    }
</script>

<style scoped>

    .userInfo_dialog_title {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #efefef;
        font-size: 14px;
    }

    .userInfo_dialog_content {
        height: 100px;
        padding: 10px;
    }
    .userInfo_dialog_role{
        padding: 5px 10px;
        border: 1px solid #efefef;
        border-radius: 5px;
        margin: 5px;
        display: inline-block;

    }
    .userInfo_dialog_item{
        padding: 10px 0;
    }
    .userInfo_dialog_action{
        text-align: right;
        padding-right: 20px;
    }
    .red{
        color: #f56c6c;
    }

</style>