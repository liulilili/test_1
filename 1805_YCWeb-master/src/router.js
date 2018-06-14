import Vue from 'vue'
import Router from 'vue-router'
import UserManage from './views/user/UserManage'
import Login from './views/Login'
import RegionList from './views/region/RegionList'
import RegionInfo from './views/region/RegionInfo'
import RegionSchoolInfo from './views/region/RegionSchoolInfo'
import RegionSchoolRoomInfo from './views/region/RegionSchoolRoomInfo'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/regionList',
            name: 'regionList',
            component: RegionList
        },
        {
            path: '/regionInfo/:regionCode',
            name: 'regionInfo',
            component: RegionInfo,
        },
        {
            path:'/schoolInfo/:schoolId',
            name: 'schoolInfo',
            component:RegionSchoolInfo
        },
        {
            path:'/roomInfo/:roomId',
            name: 'roomInfo',
            component:RegionSchoolRoomInfo
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/userManage',
            name: 'userManage',
            component: UserManage
        }
    ]
})
