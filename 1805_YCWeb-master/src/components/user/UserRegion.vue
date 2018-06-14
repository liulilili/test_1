<template>
    <div class="region_container" v-on:mouseleave="hideCity()">
        <el-row  >
            <el-col :span="5">
                <div class="region_info">
                    1
                </div>

            </el-col>
            <el-col :span="3">
                <div class="region_provinceList" >
                    <div class="region_province_contianer"  v-for="(province, index ) in provinceList">
                        <div :class="province.code"  v-on:mouseover="showCity(index)">

                            <div class="region_checkBox" @click="selectCity($event)">

                            </div>
                            <div class="region_label">
                                {{province.name}}
                            </div>
                            <div class="region_icon">
                                >
                            </div>
                        </div>

                    </div>

                </div>

            </el-col>
            <el-col :span="5" >
                <div class="region_cityList" v-if="isShowCity" >
                    <div class="region_city_contianer"   v-for="(city, index ) in cityList">
                        <div :class="city.code" v-on:mouseover="showArea(index)" >
                            <div class="region_checkBox" @click="selectCity($event)">

                            </div>
                            <div class="region_label">
                                {{city.name}}
                            </div>
                            <div class="region_icon">
                                >
                            </div>
                        </div>

                    </div>

                </div>

            </el-col>
            <el-col :span="7">
                <div class="region_areaList" v-if="isShowArea">
                    <div class="region_area_contianer"   v-for="(area, index ) in areaList">
                        <div :class="area.code" >
                            <div class="region_checkBox" @click="selectArea($event)">

                            </div>
                            <div class="region_label">
                                {{area.name}}
                            </div>
                            <div class="region_icon">
                                >
                            </div>
                        </div>

                    </div>

                </div>

            </el-col>
        </el-row>
    </div>

</template>
<style scoped="">
    .region_container{
        width: 900px;
        height: 400px;
        padding: 10px;

    }
    .region_areaList,
    .region_cityList,
    .region_provinceList{
        height: 400px;
        border: 1px solid #efefef;
        overflow-y: auto;
        overflow-x: auto;
    }
    .region_area_contianer,
    .region_city_contianer,
    .region_province_contianer{
        width: 100%;
        height: 30px;
        padding: 0 10px;
        border-bottom: 1px solid #efefef;
        line-height: 30px;
    }
    .region_province_contianer:last-child{
        border: none;
    }
    .region_checkBox{
        width: 10px;
        height: 10px;
        border: 1px solid #efefef;
        display: inline-block;
    }
    .region_label{
        padding-left: 10px;
        display: inline-block;
    }
    .region_icon{
        padding-left: 10px;
        display: inline-block;
    }
    .region_halfSelect{

    }
    .region_allSelect{
        background-image: url('../../assets/all_select.png');
        background-size: cover;
    }
    .region_halfSelect{
        background-image: url('../../assets/half_select.png');
        background-size: cover;
    }

</style>

<script>
    import ElCol from "element-ui/packages/col/src/col";
    import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
    import ElInput from "../../../node_modules/element-ui/packages/input/src/input.vue";


    export default {
        components: {
            ElInput,
            ElButton,
            ElCol},
        props: {
            isShow: {type:Boolean,default:false},
            userRegion: {
                type:Object,
                default: function(){
                    return{
                        role: 'agency',
                        status: 'enabled'
                    }
                }},
            regionList: {
                type: Array,
                default: []
            }

        },
        data() {
            return {
                regionVisible:  this.isShow,
                currentProvince:0,
                currentArea: 0,
                provinceList: this.regionList,
                cityList: [],
                areaList: [],
                isShowCity: false,
                isShowArea: false
            }
        },
        created(){
          console.log(this.cityList)
        },
        methods: {
            showCity(index){
                this.currentProvince =  index

                this.cityList = this.provinceList[index].children;
                this.isShowCity =  true;
            },
            showArea(index){
                this.isShowArea = true;
                this.currentArea =  index;
                this.areaList =  this.provinceList[this.currentProvince].children[index].children||[]
            },
            hideCity(){
                this.isShowArea = false;
                this.isShowCity =  false;
            },
            selectArea(e){
                var $element = $(e.target)

                if(!$element.hasClass('region_allSelect')){
                    $element.removeClass('region_halfSelect')
                    $element.addClass('region_allSelect')
                    var provinceId =  this.provinceList[this.currentProvince].code
                    var cityId =  this.provinceList[this.currentProvince].children[this.currentArea].code
                    $('.'+provinceId + ' > .region_checkBox').addClass('region_halfSelect')
                    $('.'+cityId + ' > .region_checkBox').addClass('region_halfSelect')
                }else{
                    $element.removeClass('region_allSelect')
                }


            },
            selectCity(e){
                var $element = $(e.target)

                if(!$element.hasClass('region_allSelect')){
                    $element.removeClass('region_halfSelect')
                    $element.addClass('region_allSelect')

                }else{
                    $element.removeClass('region_allSelect')
                }


            }
        },

        watch: {
            isShow (val) {
                this.userInfoDialogVisible = val
            },
            regionList(val){
                console.log(val)
                this.provinceList =  val
            }
        },
    }
</script>