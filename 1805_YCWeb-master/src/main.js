import Vue from 'vue'
import ElementUI from 'element-ui';
import VueResource from 'vue-resource';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/icon/iconfont.css';


import App from './App.vue'
import router from './router'

Vue.use(ElementUI);
Vue.use(VueResource);
Vue.config.productionTip = false;

Vue.prototype.bus = new Vue();
Vue.prototype.getHeader = function () {
    return {
        headers: {
            'Authorization': this.getCookie('YCUserToken')
        }
    }
};

Vue.prototype.setCookie = function (name, value, day) {
    let date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = name + '=' + value + ';expires=' + date;
};

Vue.prototype.getCookie = function (name) {
    let reg = RegExp(name + '=([^;]+)');
    let arr = document.cookie.match(reg);
    if (arr) {
        return arr[1];
    } else {
        return '';
    }
};

Vue.prototype.delCookie = function (name) {
    this.setCookie(name, null, -1);
};

Vue.prototype.checkUserToken = function (header) {
    let newToken = header.map.authorization[0];
    if (newToken !== this.getHeader().headers.Authorization) {
        this.setCookie("YCUserToken", newToken, 7);
    }
};

Vue.prototype.exitLogin=function(){
    this.$router.push('/login');
    this.delCookie('YCUserToken');
};

router.beforeEach((to, from, next) => {
    let reg = RegExp('YCUserToken' + '=([^;]+)');
    let arr = document.cookie.match(reg);
    if (to.path === '/login') {
        next()
    } else if (arr) {
        next()
    } else {
        next({path: '/login'})
    }
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
