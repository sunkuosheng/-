import HelloWorld from '@/components/HelloWorld'
import Login from '@/Login/Login.vue'
import User from '@/User/User.vue'
import Menu from '@/Menu/Menu.vue'
import Auth from '@/Auth/Auth.vue'
import Dictionaries from '@/Dictionaries/Dictionaries.vue'
import Region from '@/Region/Region.vue'
import Gather from '@/Gather/Gather.vue'
import Accounts from '@/Accounts/Accounts.vue'
import Gatheruser from '@/Gatheruser/Gatheruser.vue'

export const routes = [
    //登录
    {path: '/', name: "Login", component: Login},
    {//主页
        path: '/home', name: "home", component: HelloWorld, children: [
        //用户管理
        {path: '/home/user', name: "user", component: User},
        //菜单管理
        {path: '/home/menu', name: "menu", component: Menu},
        //角色权限管理
        {path: '/home/role', name: "role", component: Auth},
        //字典管理
        {path: '/home/dict', name: "dict", component: Dictionaries},
        //地区管理
        {path: '/home/dept', name: "dept", component: Region},
        //采集数据
        {path: '/home/info', name: "info", component: Gather},
        //公众号菜单管理
        {path: '/home/wxMenu', name: "wxMenu", component: Accounts},
        //采集人员管理
        {path: '/home/collectionUser', name: "collectionUser", component: Gatheruser},
    ]
    },
]