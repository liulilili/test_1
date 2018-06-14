<template>
    <el-table
            :data="userList"
            style="width: 100%;text-align: center"
            header-row-class-name="userList-table"
            size="small "
            border>
        <el-table-column
                prop="name"
                label="用户名"
                width="120">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="$emit('showUserInfo', scope.row)">{{scope.row.name}}
                </el-button>
            </template>
        </el-table-column>
        <el-table-column
                prop="role"
                label="用户角色">
            <template slot-scope="scope">
                <span>
                    {{scope.row.role | userRole}}
                </span>
            </template>
        </el-table-column>
        <el-table-column
                prop="email"
                label="用户邮箱">
        </el-table-column>
        <el-table-column
                prop="phone"
                label="用户手机号">
        </el-table-column>
        <el-table-column
                prop="creatorName"
                label="创建人账号"
                width="150">
        </el-table-column>
        <el-table-column
                prop="createdAt"
                label="创建日期"
                width="150">
            <template slot-scope="scope">
                <span>{{scope.row.createdAt | createData}}</span>
            </template>
        </el-table-column>
        <el-table-column
                prop="status"
                label="账号状态"
                width="120">
            <template slot-scope="scope">
                <span :class="{ red: scope.row.status ==='disabled' }">
                    {{scope.row.status ==='disabled'?'禁用':'启用'}}
                </span>
            </template>
        </el-table-column>
        <el-table-column
                width="120"
                label="操作">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="$emit('goToEdit', scope.row)">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        props: {
            userList: Array,
        },
        data() {
            return {}
        },
        methods: {
            get() {
                this.$http.get(window.url.host + '/region-tree').then((response) => {
                    console.log(response);

                }, (err) => {

                });
            }
        },
        filters: {
            createData: (value) => {
                if (!value) return '';
                let date = new Date(value);
                return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
            },
            userRole: (value) => {
                const role = {
                    superAdmin: '超级管理员',
                    agencyManager: '区域渠道负责人',
                    agency: '渠道代理商',
                    teacherManager: '教师服务负责人'
                };
                return role[value]
            }
        }
    }
</script>

<style scoped>
    .red{
        color: #f56c6c;
    }
</style>