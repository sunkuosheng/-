import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import HelloWorld from '@/components/HelloWorld'
import VueRouter from 'vue-router'
import Login from '@/Login/Login.vue'
import User from '@/User/User.vue'
import Menu from '@/Menu/Menu.vue'
import Auth from '@/Auth/Auth.vue'
import Dictionaries from '@/Dictionaries/Dictionaries.vue'
import Region from '@/Region/Region.vue'
import Gather from '@/Gather/Gather.vue'

import Accounts from '@/Accounts/Accounts.vue'
import Gatheruser from '@/Gatheruser/Gatheruser.vue'

Vue.use(VueRouter)
Vue.use(ElementUI);

const routes = [
    //登录
    {path: '/', name: "Login", component: Login},
    {//主页
        path: '/hello', name: "HelloWorld", component: HelloWorld, children: [
            //用户管理
        {path: '/hello/user', name: "User", component: User},
        //菜单管理
        {path: '/hello/menu', name: "Menu", component: Menu},
        //角色权限管理
        {path: '/hello/Auth', name: "Auth", component: Auth},
        //字典管理
        {path: '/hello/Dictionaries', name: "Dictionaries", component: Dictionaries},
        //地区管理
        {path: '/hello/Region', name: "Region", component: Region},
        //采集数据
        {path: '/hello/Gather', name: "Gather", component: Gather},
        //公众号菜单管理
        {path: '/hello/Accounts', name: "Accounts", component: Accounts},
        //采集人员管理
        {path: '/hello/Gatheruser', name: "Gatheruser", component: Gatheruser},
    ]
    },

    // {path:'/about',name:"aboutlink",component:About},
    // {path:'/login',name:"loginlink",component:Login}

]
const router = new VueRouter({
    routes,
    mode: 'history'
})
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
