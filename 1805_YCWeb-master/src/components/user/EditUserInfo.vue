<template>
    <el-dialog
            :visible.sync="userInfoDialogVisible"
            title="编辑账号信息"
            width="960px"
            center
            :before-close="close">
        <div>
            <span class="red warn">注：带有“*”必填项</span>
            <el-form :model="userInfo" ref="userInfo" :rules="rules" label-width="180px" class="user_info_form">
                <el-form-item label="用户名" prop="name">
                    <el-col :span="14">
                        <el-input v-model="userInfo.name" placeholder="2-20个字符，支持汉字/英文字母/数字"></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item label="手机号(即登录账号)" prop="phone">
                    <el-col :span="14">
                        <el-input v-model="userInfo.phone" placeholder="请正确输入手机号，手机号将作为登录账号"></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item label="密码" prop="password" :required="isAdd">
                    <el-col :span="14">
                        <el-input v-model="userInfo.password" type="password" placeholder="8-20个字符,支持数字与英文,不能为纯数字或纯字母,区分大小写"></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                    <el-col :span="14">
                        <el-input v-model="userInfo.email" placeholder="请输入联系邮箱"></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item label="角色" prop="role">
                    <el-radio-group v-model="userInfo.role" class="userInfo_dialog_radio_group">
                        <el-row class="userInfo_dialog_item_radio_row">
                            <el-col :span="8">
                                <el-radio label="agency" :disabled="currentRole!=='agencyManager'">渠道代理商</el-radio>
                            </el-col>
                            <el-col :span="8">
                                <el-radio label="agencyManager">区域渠道负责人</el-radio>
                            </el-col>
                        </el-row>
                        <el-row class="userInfo_dialog_item_radio_row">
                            <el-col :span="8">
                                <el-radio label="teacherManager">教师服务负责人</el-radio>
                            </el-col>
                            <el-col :span="8">
                                <el-radio label="superAdmin" :disabled="currentRole!=='superAdmin'">超级管理员</el-radio>
                            </el-col>
                        </el-row>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="负责城市：" required v-if="onChooseRole(userInfo.role)">
                </el-form-item>

                <div style="line-height: 40px" v-if="onChooseRole(userInfo.role)">
                    <el-row>
                        <el-col :offset="3" :span="6">
                            <div><b>已选择区域</b></div>
                            <el-card shadow="never" class="region_province">
                                <div v-for="(key,value) in currentUserSelect" :key="key.areaCode">
                                    <div class="userInfo_form_region">
                                        {{key.city}}-{{key.area}}
                                    </div>
                                    <!--<el-button type="warning" class="userInfo_form_miuns" icon="el-icon-minus"-->
                                    <!--size="mini"-->
                                    <!--circle @click="deleteUserSelect(key)"></el-button>-->
                                </div>
                            </el-card>
                        </el-col>

                        <div><b>可选择区域</b></div>
                        <el-col :span="3">
                            <el-card shadow="never" class="region_province">
                                <div v-for="(item,index) in regionList" :key="item.name"
                                     @mouseover="showCity(index)">
                                    {{item.name}}
                                    <i class="el-icon-arrow-right userInfo_right_icon"></i>
                                </div>
                            </el-card>
                        </el-col>

                        <el-col :span="5" v-if="isShowCity">
                            <el-card shadow="never" class="region_province">
                                <el-checkbox-group v-model="checkCities">
                                    <div @mouseover="showArea(index)"
                                         v-for="(city,index) in cities" :key="city.name">
                                        <el-checkbox
                                                :indeterminate="isIndeterminate[city.code]"
                                                :label="city.code"
                                                @change="handleCheckCityChange(city.code)">
                                            {{city.name}}
                                        </el-checkbox>
                                        <i class="el-icon-arrow-right userInfo_right_icon"></i>
                                    </div>
                                </el-checkbox-group>
                            </el-card>
                        </el-col>

                        <el-col :span="6" v-if="isShowArea">
                            <el-card shadow="never" class="region_province">
                                <el-checkbox-group v-model="checkedAreas[currentCityCode]"
                                                   @change="handleCheckAreaChange">
                                    <div v-for="area in areas" :key="area.name">
                                        <el-checkbox :label="area.code">
                                            {{area.name}}
                                        </el-checkbox>
                                    </div>
                                </el-checkbox-group>
                            </el-card>
                        </el-col>
                    </el-row>
                </div>

                <el-form-item label="账号状态" prop="status">
                    <el-radio-group v-model="userInfo.status">
                        <el-radio label='enabled'>启用</el-radio>
                        <el-radio label='disabled'>禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>

            <el-row class="userInfo_dialog_action_container">
                <el-col :span="24" class="">
                    <el-button class="userInfo_dialog_action" @click="close">取消</el-button>
                    <el-button class="userInfo_dialog_action" type="primary" @click="save('userInfo')">保存</el-button>
                </el-col>
            </el-row>

        </div>
    </el-dialog>

</template>

<script>
    import ElCol from "element-ui/packages/col/src/col";
    import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
    import ElInput from "../../../node_modules/element-ui/packages/input/src/input.vue";
    import ElCard from "element-ui/packages/card/src/main";

    export default {
        components: {
            ElCard,
            ElInput,
            ElButton,
            ElCol
        },
        props: {
            isAdd: {type: Boolean, default: false},
            isShow: {type: Boolean, default: false},
            userInfo: {
                type: Object,
                default: function () {
                    return {
                        role: 'teacherManager',
                        status: 'enabled'
                    }
                }
            },
            regionList: {
                type: Array,
                default: function () {
                    return []
                }
            },
            regionInfo: {
                type: Object,
                default: function () {
                    return {}
                }
            },
        },
        data() {
            let validatePass = (rule, value, callback) => {
                let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
                if((!value||value==='')&&!this.isAdd){
                    callback();
                }else if (!reg.test(value)) {
                    console.log(value);
                    callback(new Error('8-20个英文字母/数字/符号,不能是纯数字或纯字母'));
                } else {
                    callback();
                }
            };
            let validatePhone = (rule, value, callback) => {
                let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
                if (!reg.test(value)) {
                    console.log(value);
                    callback(new Error('请正确输入手机号，手机号将作为登录账号'));
                } else {
                    callback();
                }
            };
            let validateUsername = (rule, value, callback) => {
                let reg = /^\w|[\u4E00-\u9FA5]{2,20}$/;
                if (!reg.test(value)) {
                    console.log(value);
                    callback(new Error('请正确输入手机号，手机号将作为登录账号'));
                } else {
                    callback();
                }
            };

            return {
                checkCities: [],
                checkedAreas: {},
                areas: [],
                cities: [],
                isIndeterminate: {},
                rules: {
                    name: [
                        {validator: validateUsername, required: true, message: '2-20个字符，支持汉字/英文字母/数字', trigger: 'click'}
                    ],
                    phone: [
                        {validator: validatePhone, required: true, message: '请正确输入手机号，手机号将作为登录账号', trigger: 'click'}
                    ],
                    password: [
                        {
                            validator: validatePass,
                            message: '8-20个字符,支持数字与英文,不能为纯数字或纯字母,区分大小写',
                            trigger: 'click'
                        }
                    ],
                    email:[
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['click']}
                    ],
                    role: [
                        {required: true,}
                    ],
                    status: [
                        {required: true}
                    ]
                },
                userInfoDialogVisible: this.isShow,
                isSHowRegion: this.onChooseRole(this.userInfo.role),
                currentCity: [],
                isShowCity: false,
                isShowArea: false,
                currentCityCode: '',
                currentUserSelect: {},
                currentRole:'',
            }
        },
        mounted() {
            this.init();
            this.currentRole = this.getCookie('YCRole');
        },
        methods: {
            showArea(index) {
                this.isShowArea = true;
                this.currentCity[1] = index;
                this.currentCityCode = this.cities[index].code;
                this.areas = this.cities[index].children;
            },
            showCity(index) {
                this.isShowCity = true;
                this.isShowArea = false;
                this.currentCity[0] = index;
                this.cities = this.regionList[index].children;
            },
            init() {
                for (let i = 0; i < this.regionList.length; i++) {
                    let province = this.regionList[i];
                    for (let k = 0; k < province.children.length; k++) {
                        let city = province.children[k];
                        this.checkedAreas[city.code] = [];
                    }
                }
            },
            handleCheckCityChange(val) {
                this.checkedAreas[this.currentCityCode] = this.checkCities.indexOf(val) !== -1 ? this.handleRegionCode() : [];
                this.setChooseInfo(this.checkedAreas[this.currentCityCode]);
                this.isIndeterminate[val] = false;
            },
            handleCheckAreaChange(value) {
                let cityCode = this.regionList[this.currentCity[0]].children[this.currentCity[1]].code;
                let checkedCount = this.checkedAreas[this.currentCityCode];
                let index = this.checkCities.indexOf(cityCode);

                if (checkedCount.length > 0 && checkedCount.length < this.areas.length) {
                    this.addCitiesCode(index, cityCode, true);
                } else if (checkedCount.length === this.areas.length) {
                    this.addCitiesCode(index, cityCode, false);
                } else {
                    this.checkCities.splice(index, 1);
                    this.isIndeterminate[cityCode] = false;
                }
                this.setChooseInfo(checkedCount);
            },
            setChooseInfo(area) {
                let areas = this.handleRegionCode();
                let p = this.regionList[this.currentCity[0]].code;
                let c = this.regionList[this.currentCity[0]].children[this.currentCity[1]].code;
                for (let i = 0; i < areas.length; i++) {
                    let index = this.currentUserSelect[areas[i]];
                    if (area.indexOf(areas[i]) !== -1 && index === undefined) {
                        this.currentUserSelect[areas[i]] = {
                            province: this.regionInfo[p].name,
                            provinceCode: p,
                            city: this.regionInfo[p].children[c].name,
                            cityCode: c,
                            area: this.regionInfo[p].children[c].children[areas[i]].name,
                            areaCode: areas[i],
                        };
                    } else if (index !== undefined && area.indexOf(areas[i]) === -1) {
                        delete this.currentUserSelect[areas[i]]
                    }
                }
            },
            addCitiesCode(index, cityCode, is) {
                if (index === -1) {
                    this.checkCities.push(cityCode);
                } else {
                    this.checkCities.splice(index, 1, cityCode);
                }
                this.isIndeterminate[cityCode] = is;
            },
            deleteUserSelect(key) {
                delete this.currentUserSelect[key.areaCode];
                let index = this.checkedAreas[key.cityCode].indexOf(key.areaCode);
                this.checkedAreas[key.cityCode].splice(index, 1);
                if (this.checkedAreas[key.cityCode].length === 0) {
                    this.isIndeterminate[key.cityCode] = false;
                }
            },
            handleRegionCode() {
                let codes = [];
                for (let i = 0; i < this.areas.length; i++) {
                    codes.push(this.areas[i].code)
                }
                return codes
            },
            save(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.checkRegion();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            checkRegion(){
                if(!(this.userInfo.role === 'teacherManager' || this.userInfo.role === 'superAdmin')){
                    if(Object.keys(this.currentUserSelect).length===0){
                        return this.$message.error('请选择负责城市：');
                    }else {
                        this.userInfo.regions=Object.keys(this.currentUserSelect);
                    }
                }
                this.$emit('saveEvent', {
                    isAdd:this.isAdd,
                    data:this.userInfo
                });
            },
            close() {
                this.$emit('close')
            },
            onChooseRole(role) {
                return !(role === 'teacherManager' || role === 'superAdmin');
            }
        },
        filters: {
            formatDate: (date) => {

            },
            createData: (value) => {
                if (!value) return '';
                let date = new Date(value);
                return date.getFullYear() + '-' + date.getMonth() + 1 + '-' + date.getDate()
            }
        },
        watch: {
            regionList() {
                this.init();
            },
            isShow(val) {
                this.userInfoDialogVisible = val
            }
        },
    }
</script>

<style scoped>
    .userInfo_form_miuns {
        float: right;
    }

    .userInfo_form_region {
        border: 1px solid #666;
        padding: 5px 10px;
        border-radius: 3px;
        display: inline;
    }

    .userInfo_right_icon {
        font-size: 14px;
        float: right;
        line-height: 40px;
    }

    .userInfo_dialog_action {
        text-align: right;
        padding-right: 20px;
    }

    .userInfo_dialog_radio_group {
        display: block;
    }

    .userInfo_dialog_item_radio_row {
        padding: 10px;
    }

    .userInfo_dialog_action_container {
        text-align: center;
        padding: 40px 0;
    }

    .region_province {
        overflow: auto;
        height: 300px;
    }

    .user_info_form {
        margin-top: 20px;
    }

    .red {
        color: red;
    }

    .warn {
        padding-left: 120px;
    }


</style>